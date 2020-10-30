import React from 'react';

import * as timeago from 'timeago.js';

import './comments.scss';

import { isNullOrUndefined } from '../../../../common/utils';

import Comment from '../comment/comment';
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
    onAddCommentClick: (comment: string) => void;
    className?: string;
};

export default function Comments(props: CommentsProps): JSX.Element {
    const className: string =
        isNullOrUndefined(props.className) ? `` : `comments-container--default`;

    timeago.register('test', timeAgoCustomDictionary);

    return (
        <section className={`comments-container ${className}`}>
            <AddComment
                isOpen={false}
                onAddCommentClick={props.onAddCommentClick}
            />
            <section className="comments">
                {props.comments.map(comment =>
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
//                     // onAddCommentClick={props.onAddCommentClick}
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
