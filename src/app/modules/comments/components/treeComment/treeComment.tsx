import React from 'react';

import './treeComment.scss';

import { BaseCommentComponentProps, ExtendedCommentItem } from '../../types';

import FlatComment from '../flatComment/flatComment';

export type TreeCommentPropsType = BaseCommentComponentProps & {
    comment: ExtendedCommentItem;
    collapsedTrunks: Array<string>;
    onTrunkToggle: (commentId: string) => void;
    maxDeepLevel?: number;
};
export default function TreeComment(props: TreeCommentPropsType): JSX.Element {
    const isResponsedCollapsed: boolean =
        props.collapsedTrunks.includes(props.comment.id);

    return (
        <FlatComment
            {...props}
        >
            <CommentResponses
                {...props}
                level={props.comment.commentLevel}
                maxDeepLevel={props.maxDeepLevel || 5}
                isResponsesCollapsed={isResponsedCollapsed}
                commentResponses={props.comment.responses}
            />
        </FlatComment>
    );
};

type CommentResponsesPropsType = TreeCommentPropsType & {
    isResponsesCollapsed: boolean;
    level: number;
    maxDeepLevel: number;
    commentResponses: Array<ExtendedCommentItem>;
};
const CommentResponses = (props: CommentResponsesPropsType): JSX.Element => {
    if (props.commentResponses.length === 0) {
        return (<></>);
    }
    if (props.level >= props.maxDeepLevel) {
        return (<>
            {props.commentResponses.map(comment =>
                <FlatComment
                    key={comment.id}
                    {...props}
                    {...comment}
                />
            )}
        </>);
    }

    return (
        <div className="tree-comments">
            {props.isResponsesCollapsed
                ? <span
                    className="tree-comments__show-comments"
                    onClick={() => props.onTrunkToggle(props.comment.id)}
                >
                    Show comments ({props.commentResponses.length})
                </span>
                : <>
                    <div className="tree-comments__replies">
                        {props.commentResponses.map(response =>
                            <TreeComment
                                key={response.id}
                                {...props}
                                comment={response}
                            />
                        )}
                    </div>
                    <div
                        className="tree-comments__replies-tree-trunk"
                        onClick={() => props.onTrunkToggle(props.comment.id)}
                    />
                </>
            }
        </div>
    );
};
