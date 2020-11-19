import { isNullOrUndefined } from '../../common/utils';

import CommentItem, { ExtendedCommentItem } from './types';

export const sortComments = (
    orderDirection: 'asc' | 'desc',
    mode: 'flat' | 'tree',
    comments: Array<CommentItem> | Array<ExtendedCommentItem>
): Array<CommentItem> | Array<ExtendedCommentItem> => {
    const sortFunction =
        (left: CommentItem, right: CommentItem): number =>
            orderDirection === 'asc'
                ? left.date.getTime() - right.date.getTime()
                : right.date.getTime() - left.date.getTime();

    if (mode === 'flat') {
        return (comments as Array<CommentItem>).map(x => x).sort(sortFunction);
    } else {
        return sortCommentTree(sortFunction, comments as Array<ExtendedCommentItem>);
    }
};

export const addComment = (
    comments: Array<CommentItem> | Array<ExtendedCommentItem>,
    newComment: CommentItem,
    orderDirection: 'asc' | 'desc',
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
                commentLevel: 0,
                isRepsonsedCollapsed: false
            };

            return orderDirection === 'asc'
                ? [updatedNewComment, ...comments]
                : [...comments, updatedNewComment];
        } else {
            return insertCommentToTree(comments as Array<ExtendedCommentItem>, newComment, orderDirection, maxDeepLevel);
        }
    }
};

export const getComments = (mode: 'flat' | 'tree', comments: Array<CommentItem>): Array<CommentItem> | Array<ExtendedCommentItem> => {
    return mode === 'flat'
        ? comments.map(x => ({
            ...x,
            author: {
                ...x.author,
                initials: x.author.initials.substring(0, 2).toUpperCase()
            }
        }))
            .sort((left, right) => left.date.getTime() - right.date.getTime())
        : mapCommentsToExtendedModel(comments);
};

const mapCommentsToExtendedModel = (comments: Array<CommentItem>): Array<ExtendedCommentItem> => {
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
        responseComments = attachResponseComments(result, responseComments);
    } while (responseComments.length > 0)

    return result;
};

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

const attachResponseComments = (parentComments: Array<ExtendedCommentItem>, responseComments: Array<CommentItem>): Array<CommentItem> => {
    const attachedComments: Array<string> = [];

    responseComments.forEach(comment => {
        const parentComment: ExtendedCommentItem | undefined =
            findParentComment(parentComments, comment.responseTo!);

        if (!isNullOrUndefined(parentComment)) {
            parentComment.responses.push(({
                ...comment,
                responses: [],
                commentLevel: parentComment.commentLevel + 1,
                isRepsonsedCollapsed: false
            }));

            attachedComments.push(comment.id);
        }
    });

    return responseComments.filter(comment => !attachedComments.includes(comment.id));
};

const findParentComment = (parentComments: Array<ExtendedCommentItem>, commentUid: string): ExtendedCommentItem | undefined => {
    let parentComment: ExtendedCommentItem | undefined =
        parentComments.find(x => x.id === commentUid);

    if (isNullOrUndefined(parentComment)) {
        parentComments.some(comment => {
            parentComment = findParentComment(comment.responses, commentUid);

            return !isNullOrUndefined(parentComment);
        });
    }

    return parentComment;
};

const insertCommentToTree = (
    comments: Array<ExtendedCommentItem>,
    newComment: CommentItem,
    orderDirection: 'asc' | 'desc',
    maxDeepLevel: number,
): Array<ExtendedCommentItem> => {
    let result: Array<ExtendedCommentItem> = [];

    for (const comment of comments) {
        if (comment.id === newComment.responseTo) {
            const updatedNewComment: ExtendedCommentItem = {
                ...newComment,
                responses: [],
                commentLevel: comment.commentLevel + 1,
                isRepsonsedCollapsed: false
            };

            if ((comment.commentLevel + 1) <= maxDeepLevel) {
                comment.responses =
                    orderDirection === 'asc'
                        ? [updatedNewComment, ...comment.responses]
                        : [...comment.responses, updatedNewComment];

                return comments;
            } else {
                const parentComment: ExtendedCommentItem | undefined =
                    findParentComment(comments, comment.responseTo!);

                if (!isNullOrUndefined(parentComment)) {
                    parentComment.responses =
                        orderDirection === 'asc'
                            ? [updatedNewComment, ...parentComment.responses]
                            : [...parentComment.responses, updatedNewComment];

                    return comments;
                } else {
                    throw new Error(`Parent comment "${comment.responseTo}" not found for existing comment "${comment.id}".`);
                }
            }
        } else {
            return insertCommentToTree(comment.responses, newComment, orderDirection, maxDeepLevel);
        }
    }

    if (result.length === 0) {
        throw new Error(`Parent comment "${newComment.responseTo}" not found.`);
    }

    return result;
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
