import React from 'react';

import './articleList.scss';

import { has } from '../../../../common/utils';

import { ArticleItem, TagItem } from '../../types';
import { filterArticles } from '../../utils';

export type ArticleListProps = {
    items: Array<ArticleItem>;
};

type ArticleListState = {
    displayedArticles: Array<ArticleItem>;
    activeTags: Array<TagItem>;
    displayArchieved: boolean;
    searchQuery: string;
};

export default function ArticleList(props: ArticleListProps): JSX.Element {
    const [state, setState] = React.useState<ArticleListState>({
        displayedArticles: props.items,
        activeTags: [],
        displayArchieved: false,
        searchQuery: ''
    });

    const onDisplayArchievedToggle = React.useCallback(
        (displayArchieved: boolean) => {
            setState({
                ...state,
                displayArchieved: displayArchieved,
                displayedArticles: filterArticles(props.items, displayArchieved, state.activeTags, state.searchQuery)
            });
        }, [state, props.items]);

    const onActiveTagChange = React.useCallback(
        (tag: TagItem, add: boolean) => {
            let tags: Array<TagItem> = state.activeTags;

            if (add) {
                if (!has(tags, tag)) {
                    tags = [...tags, tag];
                }
            } else {
                if (has(tags, tag)) {
                    tags = tags.filter(x => x !== tag);
                }
            }

            setState({
                ...state,
                activeTags: tags,
                displayedArticles: filterArticles(props.items, state.displayArchieved, tags, state.searchQuery)
            });
        }, [state, props.items]);

    return (
        <>
        </>
    );
}