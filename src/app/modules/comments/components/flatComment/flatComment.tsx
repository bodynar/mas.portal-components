import React from 'react';

import './flatComment.scss';

import CommentItem from '../../types';

import Comment from '../comment/comment';
import AddComment from '../addComment/addComment';

export type FlatCommentProps = {
    comment: CommentItem;
    onAddCommentClick: (comment: string, responseTo: string) => void;
    onResponseClick: (commentId?: string) => void;
    responseToId?: string;
};
export default function FlatComment(props: FlatCommentProps): JSX.Element {
    const isResponseBlockVisible: boolean =
        props.responseToId === props.comment.id;

    return (
        <div>
            <Comment
                comment={props.comment}
                onResponseClick={() => props.onResponseClick(props.comment.id)}
                isResponseVisible={isResponseBlockVisible}
                key={props.comment.id}
            />
            {isResponseBlockVisible
                ? <AddComment
                    isOpen={true}
                    autofocus={false}
                    onAddCommentClick={comment => props.onAddCommentClick(comment, props.comment.id)}
                    isResponse={true}
                    onCancelClick={() => props.onResponseClick()}
                />
                : null
            }
        </div>
    );
};