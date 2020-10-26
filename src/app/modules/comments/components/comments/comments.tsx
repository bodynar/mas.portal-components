import React from 'react';

import Comment from '../comment/comment';

import { mapCommentsToExtendedModel } from '../../utils';
import CommentItem, { ExtendedCommentItem } from '../../types';

// TODO:
// 1. Options: flat \ tree, when flat - display responseTo with ling to #
// 2. Figure out about response tree level (max deep 5 => then flat)

export type CommentsProps = {
    comments: Array<CommentItem>;
    displayComments: 'flat' | 'tree';
    maxDeepLevel: number;
    onAddCommentClick: (comment: string, responseTo: string) => void;
};

type CommentsState = {
    comments: Array<ExtendedCommentItem>;
    maxDeepLevel: number;
    displayComments: 'flat' | 'tree';
}

export default function Comments(props: CommentsProps): JSX.Element {
    const [commentsState, setState] = React.useState<CommentsState>({
        ...props,
        comments: mapCommentsToExtendedModel(props.comments),
    });

    return (
        <div>
            {commentsState.comments.map(comment => 
                <Comment
                    key={comment.id}
                    comment={comment}
                    enableResponseTree={commentsState.displayComments === 'tree'}
                    maxDeepLevel={commentsState.maxDeepLevel}
                    onAddCommentClick={props.onAddCommentClick}
                />    
            )}
        </div>
    );
};