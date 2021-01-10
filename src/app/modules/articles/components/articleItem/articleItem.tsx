import React from 'react';

import { ArticleItem } from '../../types';
import { TagItem } from '../tags/types';

type ArticleProps = {
    article: ArticleItem;
    onTagClick: (tag: TagItem) => void;
};

export default function Article(props: ArticleProps): JSX.Element {
    return (
        <>
        </>
    );
}