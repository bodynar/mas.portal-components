import React from 'react';
import { ExtendedCommentItem } from '../../types';

import FlatComment from '../flatComment/flatComment';

export type TreeCommentPropsType = {
    comment: ExtendedCommentItem;
    onAddCommentClick: (comment: string, scrollToCommentAfter: boolean, responseTo: string) => void;
    onResponseClick: (commentId?: string) => void;
    responseToId?: string;
    hoveredResponseTo?: string;
    onResponseToHover?: (commentId?: string) => void;
    maxDeepLevel?: number;
};
export default function TreeComment(props: TreeCommentPropsType): JSX.Element {
    const [responseToggleState, setResponseToggleState] = React.useState(false);

    const toggleResponses = React.useCallback(() => setResponseToggleState(!responseToggleState), [responseToggleState]);

    return (
        <FlatComment
            {...props}
        >
            <CommentResponses
                {...props}
                level={props.comment.commentLevel}
                maxDeepLevel={props.maxDeepLevel || 5}
                onResponseToggleClick={toggleResponses}
                commentResponses={props.comment.responses}
            />
        </FlatComment>
    );
};

type CommentResponsesPropsType = TreeCommentPropsType & {
    level: number;
    maxDeepLevel: number;
    commentResponses: Array<ExtendedCommentItem>;
    onResponseToggleClick: () => void;
};

const CommentResponses = (props: CommentResponsesPropsType): JSX.Element => {
    if (props.commentResponses.length === 0) {
        return (<></>);
    }
    if (props.level >= props.maxDeepLevel) {
        return (<>
            {props.commentResponses.map(comment => 
                <FlatComment
                    {...props}
                    {...comment}
                />    
            )}
        </>);
    }

    return (
        <h1> h1llo w0rld !</h1>
    );
};

// const displayResponsesIfExists = (
//     maxDeepLevel: number,
//     comment: ExtendedCommentItem,
//     onTrunkClick: () => void,
//     if (comment.responses.length === 0) {
//         return (<></>);
//     }

//     if (comment.commentLevel >= maxDeepLevel) {
//         // todo: comment inline
//         return (
//             <>
//                 {comment.responses.map(response =>
//                     <Comment_old
//                         key={response.id}
//                         comment={response}
//                     />
//                 )}
//             </>
//         );
//     } else {
//         let repliesContent: JSX.Element = (<></>);

//         if (comment.isRepsonsedCollapsed) {
//             repliesContent = (
//                 <span
//                     className="comment-container__action comment-container__action--color--blue"
//                     onClick={onTrunkClick}
//                 >
//                     Show comments
//                 </span>
//             );
//         } else {
//             repliesContent = (
//                 <>
//                     <div className="comment-container__replies">
//                         {comment.responses.map(response =>
//                             <Comment_old
//                                 key={response.id}
//                                 maxDeepLevel={maxDeepLevel}
//                                 comment={response}
//                                 onAddCommentClick={onAddCommentClick}
//                             />
//                         )}
//                     </div>
//                     <div className="comment-container__replies-tree-trunk" onClick={onTrunkClick}></div>
//                 </>
//             );
//         }

//         return (
//             <div className="comment-container__replies-container">
//                 {repliesContent}
//             </div>
//         );
//     }
// };
