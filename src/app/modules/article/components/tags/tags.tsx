import React from 'react';

import './tags.scss';

import { TagItem } from './types';

type TagsProps = {
    tags: Array<TagItem>;
    onDelete?: (tag: TagItem) => void;
};

export default function Tags(props: TagsProps): JSX.Element {
    return (
        <>
        </>
    );
}