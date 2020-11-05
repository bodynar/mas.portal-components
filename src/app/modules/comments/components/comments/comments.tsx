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

export type CommentsProps = {
    comments: Array<CommentItem>;
    // displayCommentsMode: 'flat' | 'tree';
    // maxDeepLevel: number;
    // onAddCommentClick: (comment: string, responseTo?: string) => void;
    onAddCommentClick: (comment: string) => Promise<CommentItem>;
    className?: string;
};

type CommentsState = {
    orderDirection: 'asc' | 'desc';
    comments: Array<CommentItem>;
};

export default function Comments(props: CommentsProps): JSX.Element {
    const [state, setState] = React.useState<CommentsState>({
        comments: props.comments
            .map(x => x)
            .sort((left, right) => left.date.getTime() - right.date.getTime()),
        orderDirection: 'desc'
    });

    const addComment = (comment: CommentItem): void =>
        setState({
            ...state,
            comments: state.orderDirection === 'asc' ? [comment, ...state.comments] : [...state.comments, comment]
        });

    const onAddComment = (comment: string): void => {
        props.onAddCommentClick(comment)
            .then(addComment);
    };

    // const onOrderDirectionToggle = (): void => {
    //     const newDirection: 'asc' | 'desc' =
    //         state.orderDirection === 'asc' ? 'desc' : 'asc'; // TODO: redo

    //     setState({
    //         orderDirection: newDirection,
    //         comments: newDirection === 'asc'
    //             ? state.comments.map(x => x).sort((left, right) => right.date.getTime() - left.date.getTime())
    //             : state.comments.map(x => x).sort((left, right) => left.date.getTime() - right.date.getTime())
    //     });
    // };

    const onOrderDirectionToggle = React.useCallback((): void => {
        const newDirection: 'asc' | 'desc' =
            state.orderDirection === 'asc' ? 'desc' : 'asc'; // TODO: redo

        setState({
            orderDirection: newDirection,
            comments: newDirection === 'asc'
                ? state.comments.map(x => x).sort((left, right) => right.date.getTime() - left.date.getTime())
                : state.comments.map(x => x).sort((left, right) => left.date.getTime() - right.date.getTime())
        });
    }, [state.comments, state.orderDirection]);

    const className: string =
        isNullOrUndefined(props.className) ? `` : `comments-container--default`;

    timeago.register('en-US--modified', timeAgoCustomDictionary);

    return (
        <section className={`comments-container ${className}`}>
            <AddComment
                isOpen={false}
                onAddCommentClick={onAddComment}
            />
            <section className="comments-container__comments">
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
                    />
                )}
            </section>
        </section>
    );

    // return (
    //     <section className={`comments-container ${className}`}>
    //         <AddComment
    //             isOpen={false}
    //             onAddCommentClick={(comment: string) => props.onAddCommentClick(comment)}
    //         />
    //         <section className="comments">
    //             {generateCommentsMarkup(props)}
    //         </section>
    //     </section>
    // );
};

// const generateCommentsMarkup = (props: CommentsProps): JSX.Element => {
//     if (props.displayCommentsMode === 'flat') {
//         return (<>
//             {props.comments.map(comment =>
//                 <FlatComment
//                     comment={comment}
//                     key={comment.id}
//                 />
//             )}
//         </>);
//     } else {
//         const mappedComments: Array<ExtendedCommentItem> =
//             mapCommentsToExtendedModel(props.comments);

//         return (<>
//             {
//                 mappedComments.map(comment =>
//                     <Comment
//                         key={comment.id}
//                         comment={comment}
//                         maxDeepLevel={props.maxDeepLevel}
//                         onAddCommentClick={(comment, responseTo) => props.onAddCommentClick(comment, responseTo)}
//                     />
//                 )
//             }
//         </>);
//     }
// };

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
