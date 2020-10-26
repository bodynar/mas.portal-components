import React from 'react';

import './comment.scss';

import { isNullOrUndefined } from '../../../../common/utils';

import { ExtendedCommentItem } from '../../types';
import AddComment from '../addComment/addComment';

export type CommentProps = {
    comment: ExtendedCommentItem;
    enableResponseTree: boolean;
    maxDeepLevel: number;
    onAddCommentClick: (comment: string, responseTo: string) => void;
};

type CommentState = {
    comment: ExtendedCommentItem;
    isCollapsed: boolean;
    responseTo?: string;
};

// TODO: 
// 1. Posted time calc (5min ago, 5h ago, 1d ago, date)
// 2. Flat type = responseTo with icon (restyle a little bit)
// 3. Get max deep level, then flat

export default function Comment(props: CommentProps): JSX.Element {
    const [commentState, setState] = React.useState<CommentState>({
        comment: props.comment,
        isCollapsed: props.comment.isRepsonsedCollapsed === true
    });

    const toggleResponses: () => void = (): void => {
        props.comment.isRepsonsedCollapsed = !commentState.isCollapsed;

        setState({
            ...commentState,
            isCollapsed: !commentState.isCollapsed
        });
    }

    const onResponseClick: () => void = (): void => setState({ ...commentState, responseTo: commentState.comment.id });
    const onCancelAddCommentClick: () => void = (): void => setState({ ...commentState, responseTo: undefined });
    const onAddCommentClick: (comment: string, responseTo: string) => void = (comment: string, responseTo: string): void => {
        onCancelAddCommentClick();
        props.onAddCommentClick(comment, responseTo);
    };

    const deepLevelClassName: string = props.comment.commentLevel > 0 ? ' comment-container--deep' : '';
    const postedTime = '3 h.';

    return (
        <div className={`comment-container${deepLevelClassName}`} key={commentState.comment.id}>
            <div className="comment-container__info">
                <span>{commentState.comment.author.name}</span>
                <span title={commentState.comment.date.toString()}>{postedTime}</span>
            </div>
            <div className="comment-container__content">
                <p>{commentState.comment.text}</p>
            </div>
            <div className="comment-container__actions">
                {
                    isNullOrUndefined(commentState.responseTo)
                        ? <span
                            className="comment-container__action"
                            onClick={onResponseClick}
                        >
                            Response
                            </span>
                        : <AddComment
                            isOpen={true}
                            isResponse={true}
                            onAddCommentClick={(comment: string) => onAddCommentClick(comment, commentState.responseTo!)}
                            onCancelClick={onCancelAddCommentClick}
                        />
                }
            </div>
            {props.enableResponseTree
                && displayResponsesIfExists(props.maxDeepLevel, commentState.comment, toggleResponses, props.onAddCommentClick)}
        </div>
    );
};

const displayResponsesIfExists = (
    maxDeepLevel: number,
    comment: ExtendedCommentItem,
    onTrunkClick: () => void,
    onAddCommentClick: (comment: string, responseTo: string) => void): JSX.Element => {
    if (comment.responses.length === 0) {
        return (<></>);
    }

    if (comment.commentLevel >= maxDeepLevel) {
        // todo: comment inline
        return (
            <>
                {comment.responses.map(response => 
                    <Comment
                        key={response.id}
                        comment={response}
                        enableResponseTree={false}
                        maxDeepLevel={maxDeepLevel}
                        onAddCommentClick={onAddCommentClick}
                    />    
                )}
            </>
        );
    } else {
        let repliesContent: JSX.Element = (<></>);

        if (comment.isRepsonsedCollapsed) {
            repliesContent = (
                <span
                    className="comment-container__action comment-container__action--color--blue"
                    onClick={onTrunkClick}
                >
                    Show comments
                </span>
            );
        } else {
            repliesContent = (
                <>
                    <div className="comment-container__replies">
                        {comment.responses.map(response =>
                            <Comment
                                key={response.id}
                                maxDeepLevel={maxDeepLevel}
                                enableResponseTree={true}
                                comment={response}
                                onAddCommentClick={onAddCommentClick}
                            />
                        )}
                    </div>
                    <div className="comment-container__replies-tree-trunk" onClick={onTrunkClick}></div>
                </>
            );
        }

        return (
            <div className="comment-container__replies-container">
                {repliesContent}
            </div>
        );
    }
};
