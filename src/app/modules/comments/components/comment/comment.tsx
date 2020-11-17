import React from 'react';

import TimeAgo from 'timeago-react';

import './comment.scss';

import CommentItem from '../../types';
import { isNullOrEmpty, isNullOrUndefined } from '../../../../common/utils';

export type CommentProps = {
    comment: CommentItem;
    isResponseVisible: boolean;
    onResponseClick: () => void;
    className?: string;
    onResponseToHover?: (commentId?: string) => void;
};

// type FlatCommentState = {
//     comment: CommentItem;
//     // isResponseBlockVisible: boolean;
//     // isActionsToggled: boolean;
// };


export default function Comment(props: CommentProps): JSX.Element {
    // const [commentState, setState] = React.useState<FlatCommentState>({
    //     comment: props.comment,
    //     // isResponseBlockVisible: false,
    //     // isActionsToggled: false
    // });

    // const onActionsToggleClick: () => void = (): void => setState({ ...commentState, isActionsToggled: !commentState.isActionsToggled });

    const className: string =
        "comment" + (
            isNullOrEmpty(props.className)
                ? ""
                : ` ${props.className}`
        );

    return (
        <div
            className={className}
            key={props.comment.id}
            data-comment-id={props.comment.id}
        >
            <div className="comment__heading">
                <div className="comment__avatar">
                    <CommentAvatar
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
                        onHover={props.onResponseToHover || (() => { })}
                    />
                    {/* <div className="comment__actions">
                        {generateCommentActionsDropdownMenu(commentState.isActionsToggled, onActionsToggleClick)}
                    </div> */}
                </div>
            </div>
            <div className="comment__content">
                <p>{props.comment.text}</p>
            </div>
            <div className="comment__footer">
                {props.isResponseVisible
                    ? <></>
                    : <span
                        className="comment__action"
                        onClick={props.onResponseClick}
                    >
                        Response
                    </span>
                }
            </div>
        </div>
    );
};

const CommentAvatar = (props: { initials: string, displayName: string, avatar?: string }): JSX.Element => {
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

const ResponseTo = (props: {
    responseTo?: string,
    responseToAuthor?: string,
    onHover: (commentId?: string) => void,
}): JSX.Element => {
    if (isNullOrUndefined(props.responseTo)) {
        return (<></>);
    } else {
        return (
            <div className="comment__response">
                <span
                    className="gray-color"
                    data-comment-target={props.responseTo}
                    onMouseOver={() => props.onHover(props.responseTo)}
                    onMouseOut={() => props.onHover()}
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