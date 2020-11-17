import React from 'react';

import './flatComment.scss';

import CommentItem from '../../types';

import Comment from '../comment/comment';
import AddComment from '../addComment/addComment';

export type FlatCommentProps = {
    comment: CommentItem;
    onAddCommentClick: (comment: string, scrollToCommentAfter: boolean, responseTo: string) => void;
    onResponseClick: (commentId?: string) => void;
    responseToId?: string;
};
export default function FlatComment(props: FlatCommentProps): JSX.Element {
    const isResponseBlockVisible: boolean =
        props.responseToId === props.comment.id;

    return (
        <div className="flat-comment">
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
                    onAddCommentClick={(comment, needScrollTo) => props.onAddCommentClick(comment, needScrollTo, props.comment.id)}
                    isResponse={true}
                    onCancelClick={() => props.onResponseClick()}
                    className="flat-comment__response"
                />
                : null
            }
        </div>
    );
};