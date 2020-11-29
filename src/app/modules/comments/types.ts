export default interface CommentItem {
    id: string,
    author: {
        displayName: string;
        initials: string;
        avatar?: string;
    };
    text: string;
    date: Date;
    responseTo?: string;
    responseToAuthor?: string;
};

export interface ExtendedCommentItem extends CommentItem {
    responseIdsInTree: Array<string>;
    responses: Array<ExtendedCommentItem>;
    commentLevel: number;
    parent?: ExtendedCommentItem;
};

export type OrderDirection = 'asc' | 'desc';