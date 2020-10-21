import React from 'react';

import { emptyFn } from '../../common/utils';
import AddComment from './components/addComment/addComment';

export default function CommentsPage(): JSX.Element {
    return (
        <div>
            <AddComment
                isOpen={false}
                onAddCommentClick={emptyFn}
                isResponse={false}
                onCancelClick={emptyFn}
            />
        </div>
    );
};