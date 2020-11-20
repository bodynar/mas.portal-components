import React from 'react';

import * as timeago from 'timeago.js';

import './comments.scss';

import { isNullOrUndefined } from '../../../../common/utils';

// import Comment from '../comment/comment';
import AddComment from '../addComment/addComment';
import FlatComment from '../flatComment/flatComment';
import TreeComment from '../treeComment/treeComment';

import { addComment, getComments, sortComments, timeAgoCustomDictionary } from '../../utils';
import CommentItem, { ExtendedCommentItem } from '../../types';

// TODO:
// 1. Options: flat \ tree
// 2. Figure out about response tree level (max deep 5 => then flat)
// 3. Add loadMore options \ async load
// 4. Add author id into model
// 5. Add author onHover + onClick events
// 6. Get current user id to use in dropdown menu => delete comment

// TODO (Comment component)
// - Add comment actions dropwdown menu (with checkbox based)
// - Rename commentState isResponseBlockVisible

export type CommentsProps = {
    comments: Array<CommentItem>;
    displayMode: 'flat' | 'tree';
    maxDeepLevel: number;
    onAddCommentClick: (comment: string, responseTo?: string) => Promise<CommentItem>;
    className?: string;
};

type CommentsState = {
    orderDirection: 'asc' | 'desc';
    comments: Array<CommentItem> | Array<ExtendedCommentItem>;
    responseToId?: string;
    isTimeagoDictionaryRegistered: boolean;
    hoveredResponseTo?: string;
};

export default function Comments(props: CommentsProps): JSX.Element {
    const [state, setState] = React.useState<CommentsState>({
        comments: getComments(props.displayMode, props.comments),
        orderDirection: 'desc',
        isTimeagoDictionaryRegistered: false,
    });

    React.useEffect(() => {
        if (!state.isTimeagoDictionaryRegistered) {
            timeago.register('en-US--modified', timeAgoCustomDictionary);

            setState({
                ...state,
                isTimeagoDictionaryRegistered: true
            });
        }
    }, [state]);

    const onAddCommentClick = React.useCallback((comment: string, scrollToCommentAfter: boolean, responseTo?: string): void => {
        props.onAddCommentClick(comment, responseTo)
            .then((comment: CommentItem) => {
                const updatedComments: Array<CommentItem> | Array<ExtendedCommentItem> =
                    addComment(state.comments, comment, state.orderDirection, props.displayMode, props.maxDeepLevel);
// TODO: TEST
                setState({
                    ...state,
                    responseToId: undefined,
                    comments: updatedComments
                });

                if (scrollToCommentAfter) {
                    const targetComment: Element | null =
                        document.querySelector(`div[data-comment-id="${comment.id}"]`);

                    if (!isNullOrUndefined(targetComment)) {
                        targetComment.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            })
    }, [props, state]);

    const onOrderDirectionToggle = React.useCallback((): void => {
        const newDirection: 'asc' | 'desc' =
            state.orderDirection === 'asc' ? 'desc' : 'asc';

// TODO: TEST
        const comments: Array<CommentItem> | Array<ExtendedCommentItem> =
            sortComments(newDirection, props.displayMode, state.comments);

        setState({
            ...state,
            orderDirection: newDirection,
            comments: comments
        });
    }, [props, state]);

    const onResponseToClick = React.useCallback((event: React.MouseEvent<HTMLElement>): void => {
        const target = event.target as HTMLElement;

        if (target.nodeName.toLocaleLowerCase() === "span"
            && !isNullOrUndefined(target.dataset['commentTarget'])) {
            const commentId: string | undefined = target.dataset['commentTarget'];

            const targetComment: Element | null =
                document.querySelector(`div[data-comment-id="${commentId}"]`);

            if (!isNullOrUndefined(targetComment)) {
                targetComment.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    const onResponseClick = React.useCallback(
        (commentId?: string): void =>
            setState({
                ...state,
                responseToId: commentId
            }),
        [state]);

    const onResponseToHover = React.useCallback(
        (commentId: string | undefined): void => setState({
            ...state,
            hoveredResponseTo: commentId
        }), [state]);

    const className: string =
        isNullOrUndefined(props.className) ? `` : `comments-container--default`;

    return (
        <section className={`comments-container ${className}`}>
            <AddComment
                isOpen={false}
                autofocus={true}
                onAddCommentClick={onAddCommentClick}
            />
            <section
                className="comments-container__comments"
                onClick={onResponseToClick}
            >
                <span className="comments-container__order-direction-switch">
                    <OrderDirectionSwitch
                        orderDirection={state.orderDirection}
                        onIconClick={onOrderDirectionToggle}
                    />
                </span>
                {props.displayMode === 'flat'
                    ? <FlatComments
                        comments={state.comments}
                        hoveredResponseTo={state.hoveredResponseTo}
                        responseToId={state.responseToId}
                        onAddCommentClick={onAddCommentClick}
                        onResponseClick={onResponseClick}
                        onResponseToHover={onResponseToHover}
                    />
                    : <TreeComments
                        comments={state.comments as Array<ExtendedCommentItem>}
                        hoveredResponseTo={state.hoveredResponseTo}
                        responseToId={state.responseToId}
                        onAddCommentClick={onAddCommentClick}
                        onResponseClick={onResponseClick}
                        onResponseToHover={onResponseToHover}
                    />
                }
            </section>
        </section>
    );
};

const OrderDirectionSwitch = (props: { orderDirection: 'asc' | 'desc', onIconClick: () => void }): JSX.Element => {
    const tittleCaptionTypeWord: string =
        props.orderDirection === 'desc'
            ? 'Newest'
            : 'Oldest';

    const iconClassName: string =
        props.orderDirection === 'desc'
            ? 'up'
            : 'down';

    return (<i
        className={`fas fa-arrow-${iconClassName}`}
        title={`${tittleCaptionTypeWord} first`}
        onClick={() => props.onIconClick()}
    ></i>);
};

const FlatComments = (props: {
    comments: Array<CommentItem>;
    responseToId?: string;
    hoveredResponseTo?: string;
    onAddCommentClick: (comment: string, scrollToCommentAfter: boolean, responseTo?: string) => void;
    onResponseClick: (commentId?: string) => void;
    onResponseToHover?: (commentId?: string) => void;
}): JSX.Element => {
    return (
        <>
            {props.comments.map(comment =>
                <FlatComment
                    {...props}
                    comment={comment}
                    key={comment.id}
                />
            )}
        </>
    );
};

const TreeComments = (props: {
    comments: Array<ExtendedCommentItem>;
    responseToId?: string;
    hoveredResponseTo?: string;
    onAddCommentClick: (comment: string, scrollToCommentAfter: boolean, responseTo?: string) => void;
    onResponseClick: (commentId?: string) => void;
    onResponseToHover?: (commentId?: string) => void;
}): JSX.Element => {
    return (
        <>
            {props.comments.map(rootComment =>
                <TreeComment
                    comment={rootComment}
                    {...props}
                />
            )}
        </>
    );
};