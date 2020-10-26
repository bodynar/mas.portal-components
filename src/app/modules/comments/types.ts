export default interface CommentItem {
    id: string,
    author: {
        name: string;
        avatar?: string;
    };
    text: string;
    date: Date;
    responseTo?: string;
};

export interface ExtendedCommentItem extends CommentItem {
    responses: Array<ExtendedCommentItem>;
    commentLevel: number;
    isRepsonsedCollapsed?: boolean;
};