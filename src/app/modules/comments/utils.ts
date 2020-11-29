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

// #region getComments

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
            : toExtendedModel(maxDeepLevel, comments);

    return sortComments('desc', mode, mappedComments);
};

const toExtendedModel = (maxDeepLevel: number, comments: Array<CommentItem>): Array<ExtendedCommentItem> => {
    const result: Array<ExtendedCommentItem> =
        comments.filter(x => isNullOrUndefined(x.responseTo))
            .map(comment => ({
                ...comment,
                responses: [],
                responseIdsInTree: [],
                commentLevel: 0,
            }) as ExtendedCommentItem);

    const mappedComments: Array<ExtendedCommentItem> =
        [...result];

    let notMappedComments: Array<CommentItem> =
        comments.filter(x => !isNullOrUndefined(x.responseTo));

    do {
        notMappedComments = mapResponses(notMappedComments, mappedComments, maxDeepLevel);
    } while (notMappedComments.length > 0)

    return result;
};

const mapResponses = (notMappedComments: Array<CommentItem>, mappedComments: Array<ExtendedCommentItem>, maxDeepLevel: number) => {
    const notMappedComment = notMappedComments.pop()!;

    const parentComment = getParentComment(mappedComments, notMappedComment.responseTo!, maxDeepLevel);
    if (!isNullOrUndefined(parentComment)) {
        const mappedComment: ExtendedCommentItem =
        {
            ...notMappedComment,
            responses: [],
            responseIdsInTree: [],
            commentLevel: parentComment.commentLevel + 1,
            parent: parentComment,
        };

        parentComment.responses.push(mappedComment);
        appendChildTreeId(parentComment, mappedComment.id);
        mappedComments.push(mappedComment);
        notMappedComments = notMappedComments.filter(x => x.id !== notMappedComment.id);
    }

    return notMappedComments.reverse();
};

const getParentComment = (comments: Array<ExtendedCommentItem>, commentId: string, maxDeepLevel: number): ExtendedCommentItem | undefined => {
    let parentComment: ExtendedCommentItem | undefined =
        comments.find(x => x.id === commentId);

    if (!isNullOrUndefined(parentComment) && parentComment.commentLevel > maxDeepLevel) {
        if (!isNullOrUndefined(parentComment.responseTo)) {
            parentComment = getParentComment(comments, parentComment.responseTo, maxDeepLevel);
        } else {
            return undefined;
        }
    }

    return parentComment;
};

// #endregion

const appendChildTreeId = (parentItem: ExtendedCommentItem, commentId: string): void => {
    parentItem.responseIdsInTree.push(commentId);

    if (!isNullOrUndefined(parentItem.parent)) {
        appendChildTreeId(parentItem.parent, commentId);
    }
};

// #region addComment

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
                responseIdsInTree: [],
                commentLevel: 0
            };

            return orderDirection === 'asc'
                ? [updatedNewComment, ...comments]
                : [...comments, updatedNewComment];
        } else {
            insertCommentToTreeItem(comments as Array<ExtendedCommentItem>, newComment, orderDirection, maxDeepLevel);

            return comments;
        }
    }
};

const insertCommentToTreeItem = (
    comments: Array<ExtendedCommentItem>,
    newComment: CommentItem,
    orderDirection: OrderDirection,
    maxDeepLevel: number,
): void => {
    debugger
    const parentComment: ExtendedCommentItem | undefined =
        getParentCommentFromTree(comments, newComment.responseTo!, maxDeepLevel);

    if (!isNullOrUndefined(parentComment)) {
        const updatedNewComment: ExtendedCommentItem = {
            ...newComment,
            responses: [],
            responseIdsInTree: [],
            commentLevel: parentComment.commentLevel + 1,
            parent: parentComment,
        };

        parentComment.responses =
            orderDirection === 'asc'
                ? [updatedNewComment, ...parentComment.responses]
                : [...parentComment.responses, updatedNewComment];
        appendChildTreeId(parentComment, newComment.id);
    } else {
        throw new Error(`Parent comment "${newComment.responseTo}" not found.`);
    }
};

const getParentCommentFromTree = (comments: Array<ExtendedCommentItem>, commentId: string, maxDeepLevel: number): ExtendedCommentItem | undefined => {
    let parentComment: ExtendedCommentItem | undefined =
        comments.find(x => x.id === commentId);

    if (isNullOrUndefined(parentComment)) {
        const foundTrunkRoot: ExtendedCommentItem | undefined =
            comments.find(x => x.responseIdsInTree.includes(commentId));

        if (!isNullOrUndefined(foundTrunkRoot)) {
            foundTrunkRoot.responses.some(x => {
                const hasChild: boolean =
                    x.id === commentId || x.responseIdsInTree.includes(commentId);

                if (hasChild) {
                    parentComment =
                        x.id === commentId
                            ? x
                            : parentComment = getParentCommentFromTree(x.responses, commentId, maxDeepLevel);

                    return !isNullOrUndefined(parentComment);
                } else {
                    return false;
                }
            });
        }
    }

    if (!isNullOrUndefined(parentComment) && parentComment.commentLevel >= maxDeepLevel) {
        parentComment = getParentByLevel(maxDeepLevel, parentComment);
    }

    return parentComment;
};

const getParentByLevel = (maxDeepLevel: number, comment?: ExtendedCommentItem): ExtendedCommentItem | undefined => {
    if (!isNullOrUndefined(comment)) {
        if (comment.commentLevel < maxDeepLevel) {
            return comment;
        } else {
            return getParentByLevel(maxDeepLevel, comment.parent);
        }
    } else {
        return undefined;
    }
};

// #endregion

//#region sortComments

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

// #endregion
