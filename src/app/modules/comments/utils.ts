import { isNullOrUndefined } from '../../common/utils';

import CommentItem, { ExtendedCommentItem } from './types';

export const mapCommentsToExtendedModel = (comments: Array<CommentItem>): Array<ExtendedCommentItem> => {
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
}
