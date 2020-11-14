import React from 'react';

import * as timeago from 'timeago.js';

import './comments.scss';

import { isNullOrUndefined } from '../../../../common/utils';

// import Comment from '../comment/comment';
import AddComment from '../addComment/addComment';
import FlatComment from '../flatComment/flatComment';

import { mapCommentsToExtendedModel, timeAgoCustomDictionary } from '../../utils';
import CommentItem, { ExtendedCommentItem } from '../../types';

// TODO:
// 1. Options: flat \ tree, when flat - display responseTo with ling to #
// 2. Figure out about response tree level (max deep 5 => then flat)
// 3. After add - scroll to comment or to addComment

export type CommentsProps = {
    comments: Array<CommentItem>;
    // displayCommentsMode: 'flat' | 'tree';
    // maxDeepLevel: number;
    // onAddCommentClick: (comment: string, responseTo?: string) => void;
    onAddCommentClick: (comment: string, responseTo?: string) => Promise<CommentItem>;
    className?: string;
};

type CommentsState = {
    orderDirection: 'asc' | 'desc';
    comments: Array<CommentItem>;
    responseToId?: string;
    isTimeagoDictionaryRegistered: boolean;
};

export default function Comments(props: CommentsProps): JSX.Element {
    const [state, setState] = React.useState<CommentsState>({
        comments: props.comments
            .map(x => ({
                ...x,
                author: {
                    ...x.author,
                    initials: x.author.initials.substring(0, 2).toUpperCase()
                }
            }) as CommentItem)
            .sort((left, right) => left.date.getTime() - right.date.getTime()),
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

    const onAddCommentClick = React.useCallback((comment: string, responseTo?: string): void => {
        props.onAddCommentClick(comment, responseTo)
            .then((comment: CommentItem) =>
                setState({
                    ...state,
                    responseToId: undefined,
                    comments: state.orderDirection === 'asc' ? [comment, ...state.comments] : [...state.comments, comment]
                }));
    }, [props, state]);

    const onOrderDirectionToggle = React.useCallback((): void => {
        const newDirection: 'asc' | 'desc' =
            state.orderDirection === 'asc' ? 'desc' : 'asc';

        setState({
            ...state,
            orderDirection: newDirection,
            comments: newDirection === 'asc'
                ? state.comments.map(x => x).sort((left, right) => right.date.getTime() - left.date.getTime())
                : state.comments.map(x => x).sort((left, right) => left.date.getTime() - right.date.getTime())
        });
    }, [state]);

    const onResponseToClick = React.useCallback((event: React.MouseEvent<HTMLElement>): void => {
        const target = event.target as HTMLElement;

        if (target.nodeName.toLocaleLowerCase() === "span"
            && !isNullOrUndefined(target.dataset['commentTarget'])) {
            const commentId: string = target.dataset['commentTarget'];

            const targetComment: Element | null =
                document.querySelector(`div[data-comment-id="${commentId}"]`);

            if (!isNullOrUndefined(targetComment)) {
                targetComment.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    const onResponseClick = React.useCallback(
        (commentId: string | undefined) =>
            setState({
                ...state,
                responseToId: commentId
            }),
        [state]);

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
                {state.comments.map(comment =>
                    <FlatComment
                        comment={comment}
                        key={comment.id}
                        onAddCommentClick={onAddCommentClick}
                        onResponseClick={onResponseClick}
                        responseToId={state.responseToId}
                    />
                )}
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
