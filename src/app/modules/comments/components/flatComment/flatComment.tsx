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
    hoveredResponseTo?: string;
    onResponseToHover?: (commentId?: string) => void;
};
export default function FlatComment(props: FlatCommentProps): JSX.Element {
    const isResponseBlockVisible: boolean =
        props.responseToId === props.comment.id;

    const isCommentHovered: boolean =
        props.comment.id === props.hoveredResponseTo;

    const commentClassName: string =
        "flat-comment__comment" + (
            isCommentHovered ? " flat-comment__comment--highlight" : ""
        );

    return (
        <div className="flat-comment">
            <Comment
                key={props.comment.id}
                comment={props.comment}
                className={commentClassName}
                onResponseClick={() => props.onResponseClick(props.comment.id)}
                isResponseVisible={isResponseBlockVisible}
                onResponseToHover={props.onResponseToHover}
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