import React from 'react';

import { ArticleItem, TagItem } from '../../types';

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