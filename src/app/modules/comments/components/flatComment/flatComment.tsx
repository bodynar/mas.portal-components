import React from 'react';

import TimeAgo from 'timeago-react';

import './flatComment.scss';

import CommentItem from '../../types';
import { isNullOrUndefined } from '../../../../common/utils';

export type FlatCommentProps = {
    comment: CommentItem;
    commentContainerRef?: React.MutableRefObject<HTMLDivElement | null>;
    onResponseToClick?: (commentId: string) => void;
    // onAddCommentClick: (comment: string, responseTo: string) => void;
};

// type FlatCommentState = {
//     comment: CommentItem;
//     // isResponseBlockVisible: boolean;
//     // isActionsToggled: boolean;
// };


// TODO (v1.2)
// - Add comment actions dropwdown menu (with checkbox based)
// - Figure out about AddComment position, display and events handlex
// - Add icon response and href
// - Rename commentState isResponseBlockVisible

export default function FlatComment(props: FlatCommentProps): JSX.Element {
    // const [commentState, setState] = React.useState<FlatCommentState>({
    //     comment: props.comment,
    //     // isResponseBlockVisible: false,
    //     // isActionsToggled: false
    // });

    // const onActionsToggleClick: () => void = (): void => setState({ ...commentState, isActionsToggled: !commentState.isActionsToggled });
    // const onResponseClick: () => void = (): void => setState({ ...commentState, isResponseBlockVisible: true });
    // const onCancelAddCommentClick: () => void = (): void => setState({ ...commentState, isResponseBlockVisible: false });
    // const onAddCommentClick: (comment: string) => void = (comment: string): void => {
    //     onCancelAddCommentClick();
    //     props.onAddCommentClick(comment, commentState.comment.id);
    // };

    // const userAvatarBlock: JSX.Element =
    //     isNullOrUndefined(props.comment.author.avatar)
    //         ? <span
    //             className="comment__avatar-img comment__avatar-img--only-initials"
    //         >
    //             {props.comment.author.initials}
    //         </span>
    //         : <img
    //             className="comment__avatar-img"
    //             src={props.comment.author.avatar}
    //             alt={`${props.comment.author.displayName}'s avatar`}
    //         />;

    const onResponseToClick = React.useCallback((commentId: string): void => {
        if (!isNullOrUndefined(props.onResponseToClick)) {
            props.onResponseToClick(commentId);
        }
    }, [props]);

    return (
        <div
            className="comment"
            key={props.comment.id}
            ref={props.commentContainerRef}
        >
            <div className="comment__heading">
                <div className="comment__avatar">
                    <CommentAvaratar
                        key={props.comment.author.avatar || props.comment.author.initials}
                        displayName={props.comment.author.displayName}
                        initials={props.comment.author.initials}
                        avatar={props.comment.author.avatar}
                    />
                </div>
                <div className="comment__info">
                    <div className="comment__author">
                        <span>{props.comment.author.displayName}</span>
                    </div>
                    <div className="comment__postedTime-container">
                        <TimeAgo
                            className="comment__postedTime gray-color"
                            datetime={props.comment.date}
                            locale="en-US--modified"
                            live={false}
                            ref={x => {
                                if (x && x.dom) {
                                    x.dom.title = props.comment.date.toLocaleString();
                                }

                                return x;
                            }}
                        />
                    </div>
                    <ResponseTo
                        key={props.comment.id + props.comment.responseTo}
                        responseTo={props.comment.responseTo}
                        responseToAuthor={props.comment.responseToAuthor}
                        onClick={onResponseToClick}
                    />
                    {/* <div className="comment__actions">
                        {generateCommentActionsDropdownMenu(commentState.isActionsToggled, onActionsToggleClick)}
                    </div> */}
                </div>
            </div>
            <div className="comment__content">
                <p>{props.comment.text}</p>
            </div>
            {/* <div className="comment__footer">
                {
                    props.isResponseBlockVisible
                        ? <></>
                        : <span
                            className="comment__action"
                            onClick={onResponseClick}
                        >
                            Response
                        </span>
                }
            </div> */}
        </div>
    );
};

const CommentAvaratar = (props: { initials: string, displayName: string, avatar?: string }): JSX.Element => {
    if (!isNullOrUndefined(props.avatar)) {
        return (
            <>
                <img
                    className="comment__avatar-img"
                    src={props.avatar}
                    alt={`${props.displayName}'s avatar`}
                />
            </>
        );
    } else {
        return (<span
            className="comment__avatar-img comment__avatar-img--only-initials"
        >
            {props.initials}
        </span>);
    }
};

const ResponseTo = (props: { onClick?: (commentId: string) => void, responseTo?: string, responseToAuthor?: string }): JSX.Element => {
    if (isNullOrUndefined(props.responseTo)) {
        return (<></>);
    } else {
        return (
            <div className="comment__response">
                <span
                    className="gray-color"
                    onClick={_ => props.onClick?.(props.responseTo!)}
                >
                    <i className="fas fa-reply"></i> {props.responseToAuthor}
                </span>
            </div>
        );
    }
};

// const generateCommentActionsDropdownMenu = (isToggled: boolean, onActionsClick: () => void): JSX.Element => {
//     return (
//         <div className="comment__action-dropdown">
//             <button
//                 className="comment__action-dropdown-toggler"
//                 onClick={() => onActionsClick()}
//             >
//                 <i className="fas fa-ellipsis-v"></i>
//             </button>
//             <ul>
//                 <li>Action 1</li>
//                 <li>Action 2</li>
//                 <li>Action 3</li>
//             </ul>
//         </div>
//     );
// };