import { isNullOrUndefined } from '../../common/utils';

import CommentItem, { ExtendedCommentItem, OrderDirection } from './types';

const EN_US = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

export const timeAgoCustomDictionary = (diff: number, idx: number): [string, string] => {
    if (idx === 0) {
        return ['just now', 'just now'];
    }
    let unit = EN_US[Math.floor(idx / 2)];

    if (diff > 1) {
        unit += 's';
    }

    return [`${diff} ${unit} ago`, `${diff} ${unit} ago`];
};

export const sortComments = (
    orderDirection: OrderDirection,
    mode: 'flat' | 'tree',
    comments: Array<CommentItem> | Array<ExtendedCommentItem>
): Array<CommentItem> | Array<ExtendedCommentItem> => {
    const sortFunction =
        (left: CommentItem, right: CommentItem): number =>
            orderDirection === 'asc'
                ? right.date.getTime() - left.date.getTime()
                : left.date.getTime() - right.date.getTime();

    if (mode === 'flat') {
        return (comments as Array<CommentItem>).map(x => x).sort(sortFunction);
    } else {
        return sortCommentTree(sortFunction, comments as Array<ExtendedCommentItem>);
    }
};

export const addComment = (
    comments: Array<CommentItem> | Array<ExtendedCommentItem>,
    newComment: CommentItem,
    orderDirection: OrderDirection,
    mode: 'flat' | 'tree',
    maxDeepLevel: number
): Array<CommentItem> | Array<ExtendedCommentItem> => {
    if (mode === 'flat') {
        return orderDirection === 'asc'
            ? [newComment, ...comments]
            : [...comments, newComment];
    } else {
        if (isNullOrUndefined(newComment.responseTo)) {
            const updatedNewComment: ExtendedCommentItem = {
                ...newComment,
                responses: [],
                commentLevel: 0
            };

            return orderDirection === 'asc'
                ? [updatedNewComment, ...comments]
                : [...comments, updatedNewComment];
        } else {
            insertCommentToTree(comments as Array<ExtendedCommentItem>, newComment, orderDirection, maxDeepLevel);

            return comments;
        }
    }
};

export const getComments = (mode: 'flat' | 'tree', maxDeepLevel: number, comments: Array<CommentItem>): Array<CommentItem> | Array<ExtendedCommentItem> => {
    const mappedComments: Array<CommentItem> | Array<ExtendedCommentItem> =
        mode === 'flat'
            ? comments.map(x => ({
                ...x,
                author: {
                    ...x.author,
                    initials: x.author.initials.substring(0, 2).toUpperCase()
                }
            }))
                .sort((left, right) => left.date.getTime() - right.date.getTime())
            : mapCommentsToExtendedModel(maxDeepLevel, comments);

    return sortComments('desc', mode, mappedComments);
};

const mapCommentsToExtendedModel = (maxDeepLevel: number, comments: Array<CommentItem>): Array<ExtendedCommentItem> => {
    const result = comments.filter(x => isNullOrUndefined(x.responseTo))
        .map(comment => ({
            ...comment,
            responses: [],
            commentLevel: 0,
            isRepsonsedCollapsed: false
        }) as ExtendedCommentItem);

    let responseComments: Array<CommentItem> =
        comments.filter(x => !isNullOrUndefined(x.responseTo));

    do {
        responseComments = attachResponseComments(result, responseComments, maxDeepLevel);
    } while (responseComments.length > 0)

    return result;
};

const attachResponseComments = (parentComments: Array<ExtendedCommentItem>, responseComments: Array<CommentItem>, maxDeepLevel: number): Array<CommentItem> => {
    const attachedComments: Array<string> = [];

    responseComments.forEach(comment => {
        const responseToComment: ExtendedCommentItem | undefined =
            findParentComment(parentComments, comment.responseTo!);

        if (!isNullOrUndefined(responseToComment)) {
            if ((responseToComment.commentLevel + 1) <= maxDeepLevel) {
                responseToComment.responses.push(({
                    ...comment,
                    responses: [],
                    commentLevel: responseToComment.commentLevel + 1
                }));

                attachedComments.push(comment.id);
            } else {
                const parentResponseToComment: ExtendedCommentItem | undefined =
                    findParentComment(parentComments, responseToComment.responseTo!);


                if (isNullOrUndefined(parentResponseToComment)) {
                    throw new Error(`Parent comment "${comment.responseTo}" not found.`);
                }
                parentResponseToComment.responses.push({
                    ...comment,
                    responses: [],
                    commentLevel: parentResponseToComment.commentLevel + 1,
                });

                attachedComments.push(comment.id);
            }
        }
    });

    return responseComments.filter(comment => !attachedComments.includes(comment.id));
};

const findParentComment = (parentComments: Array<ExtendedCommentItem>, commentUid: string): ExtendedCommentItem | undefined => {
    let parentComment: ExtendedCommentItem | undefined =
        parentComments.find(x => x.id === commentUid);

    if (isNullOrUndefined(parentComment)) {
        parentComments.some(comment => {
            parentComment = findParentComment(comment.responses, commentUid, maxDeepLevel);

            return !isNullOrUndefined(parentComment);
        });
    }

    // if (!isNullOrUndefined(parentComment) && !isNullOrUndefined(maxDeepLevel)
    //     && parentComment.commentLevel > maxDeepLevel) {
    //     parentComment = findParentComment(parentComments, parentComment?.responseTo!, maxDeepLevel);
    // }

    return parentComment;
};

const insertCommentToTree = (
    comments: Array<ExtendedCommentItem>,
    newComment: CommentItem,
    orderDirection: OrderDirection,
    maxDeepLevel: number,
): void => {
    const responseToComment: ExtendedCommentItem | undefined =
        findParentComment(comments, newComment.responseTo!);

    if (isNullOrUndefined(responseToComment)) {
        throw new Error(`Parent comment "${newComment.responseTo}" not found.`);
    }
    else {
        const updatedNewComment: ExtendedCommentItem = {
            ...newComment,
            responses: [],
            commentLevel: responseToComment.commentLevel + 1
        };

        if ((responseToComment.commentLevel + 1) <= maxDeepLevel) {
            responseToComment.responses =
                orderDirection === 'asc'
                    ? [updatedNewComment, ...responseToComment.responses]
                    : [...responseToComment.responses, updatedNewComment];
        } else {
            const responseToParentComment: ExtendedCommentItem | undefined =
                findParentComment(comments, responseToComment.responseTo!);
            // todo: problem here
            // if parentResponseToComment level +1 > 5 => issue

            if (isNullOrUndefined(responseToParentComment)) {
                throw new Error(`Parent comment "${responseToComment.responseTo}" not found.`);
            } else {
                updatedNewComment.commentLevel = responseToParentComment.commentLevel + 1;

                responseToParentComment.responses =
                    orderDirection === 'asc'
                        ? [updatedNewComment, ...responseToParentComment.responses]
                        : [...responseToParentComment.responses, updatedNewComment];
            }
        }
    }
};

const sortCommentTree = (
    sortFunction: (left: CommentItem, right: CommentItem) => number,
    comments: Array<ExtendedCommentItem>
): Array<ExtendedCommentItem> => {
    const result: Array<ExtendedCommentItem> =
        comments.map(x => x).sort(sortFunction);

    for (const comment of comments) {
        comment.responses = [...sortCommentTree(sortFunction, comment.responses)];
    }

    return result;
};
