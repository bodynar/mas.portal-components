import React from 'react';

import * as timeago from 'timeago.js';

import './comments.scss';

import { isNullOrUndefined } from '../../../../common/utils';

// import Comment from '../comment/comment';
import AddComment from '../addComment/addComment';
import FlatComment from '../flatComment/flatComment';
import TreeComment from '../treeComment/treeComment';

import { addComment, getComments, sortComments, timeAgoCustomDictionary } from '../../utils';
import CommentItem, { ExtendedCommentItem, OrderDirection } from '../../types';

// TODO:
// 1. Styles when window width 620px (e.g.): responses, response block
// 2. Add author options (onHover + onClick events) - add authorId in model
// 3. Add comment options (delete comment, report comment, etc)
// 4. Add loadMore \ async load options

export type CommentsProps = {
    comments: Array<CommentItem>;
    displayMode: 'flat' | 'tree';
    maxDeepLevel?: number;
    onAddCommentClick: (comment: string, responseTo?: string) => Promise<CommentItem>;
    className?: string;
};

type CommentsState = {
    orderDirection: OrderDirection;
    comments: Array<CommentItem> | Array<ExtendedCommentItem>;
    collapsedTrunks: Array<string>;
    responseToId?: string;
    isTimeagoDictionaryRegistered: boolean;
    hoveredResponseTo?: string;
};

export default function Comments(props: CommentsProps): JSX.Element {
    if (props.displayMode === 'tree' && isNullOrUndefined(props.maxDeepLevel)) {
        throw new Error('When display mode is tree maxDeepLevel must be specified.');
    }

    const maxDeepLevel: number = props.maxDeepLevel || 5;

    const [state, setState] = React.useState<CommentsState>({
        comments: [],
        orderDirection: 'desc',
        isTimeagoDictionaryRegistered: false,
        collapsedTrunks: [],
    });

    const setComments = React.useCallback(
        (comments: Array<CommentItem> | Array<ExtendedCommentItem>) =>
            setState(oldState => ({
                ...oldState,
                comments: comments,
            })),
        []
    );

    React.useEffect(() => {
        if (state.comments.length === 0) {
            const comments: Array<CommentItem> | Array<ExtendedCommentItem> =
                getComments(props.displayMode, maxDeepLevel, props.comments);

            setComments(comments);
        }
    }, [state, maxDeepLevel, props.displayMode, props.comments, setComments]);

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
                    addComment(state.comments, comment, state.orderDirection, props.displayMode, maxDeepLevel);

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
    }, [props, state, maxDeepLevel]);

    const onOrderDirectionToggle = React.useCallback((): void => {
        const newDirection: OrderDirection =
            state.orderDirection === 'asc' ? 'desc' : 'asc';

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

    const onTrunkToggle = React.useCallback(
        (commentId: string) => {
            let updatedTrunks: Array<string> = [...state.collapsedTrunks];

            if (state.collapsedTrunks.includes(commentId)) {
                const filteredTrunks: Array<string> =
                    state.collapsedTrunks.filter(x => x !== commentId);

                updatedTrunks = filteredTrunks;
            } else {
                updatedTrunks = [...updatedTrunks, commentId];
            }

            setState({
                ...state,
                collapsedTrunks: updatedTrunks
            });
        }, [state]);

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
                        collapsedTrunks={state.collapsedTrunks}
                        hoveredResponseTo={state.hoveredResponseTo}
                        responseToId={state.responseToId}
                        onAddCommentClick={onAddCommentClick}
                        onResponseClick={onResponseClick}
                        onTrunkToggle={onTrunkToggle}
                        onResponseToHover={onResponseToHover}
                    />
                }
            </section>
        </section>
    );
};

const OrderDirectionSwitch = (props: { orderDirection: OrderDirection, onIconClick: () => void }): JSX.Element => {
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
                    key={comment.id}
                    {...props}
                    comment={comment}
                />
            )}
        </>
    );
};

const TreeComments = (props: {
    comments: Array<ExtendedCommentItem>;
    collapsedTrunks: Array<string>;
    responseToId?: string;
    hoveredResponseTo?: string;
    onAddCommentClick: (comment: string, scrollToCommentAfter: boolean, responseTo?: string) => void;
    onResponseClick: (commentId?: string) => void;
    onTrunkToggle: (commentId: string) => void;
    onResponseToHover?: (commentId?: string) => void;
}): JSX.Element => {
    return (
        <>
            {props.comments.map(rootComment =>
                <TreeComment
                    key={rootComment.id}
                    comment={rootComment}
                    {...props}
                />
            )}
        </>
    );
};