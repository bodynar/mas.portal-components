import React from 'react';

import './articleList.scss';

import { has } from '../../../../common/utils';

import { ArticleItem, TagItem } from '../../types';
import { filterArticles } from '../../utils';

import Checkbox from '../checkbox/checkbox';
import Article from '../articleItem/articleItem';
import Search from '../search/search';

type ArticleListProps = {
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
        (displayArchieved: boolean): void => {
            setState({
                ...state,
                displayArchieved: displayArchieved,
                displayedArticles: filterArticles(props.items, displayArchieved, state.activeTags, state.searchQuery)
            });
        }, [state, props.items]);

    const onActiveTagChange = React.useCallback(
        (tag: TagItem, add: boolean): void => {
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

    const onSearchQueryChange = React.useCallback(
        (searchQuery: string): void => {
            setState({
                ...state,
                searchQuery: searchQuery
            })
        }, [state]);

    const onSearchClick = React.useCallback(
        (): void => {
            setState({
                ...state,
                displayedArticles: filterArticles(props.items, state.displayArchieved, state.activeTags, state.searchQuery)
            })
        }, [state, props.items]);

    return (
        <section className="article-list">
            <section className="article-list__filters">
                {/* <div> */}
                    {/* SORTING */}
                    <Search
                        query={state.searchQuery}
                        onSearchQueryChange={onSearchQueryChange}
                        onSearchClick={onSearchClick}
                    />
                    <Checkbox
                        label='Display archieved'
                        value={state.displayArchieved}
                        onChange={onDisplayArchievedToggle}
                    />
                {/* </div> */}
                <div>
                    {/* tags */}
                </div>
            </section>
            <section className="article-list__items">
                {state.displayedArticles.map(article =>
                    <Article
                        key={article.id}
                        article={article}
                        onTagClick={tag => onActiveTagChange(tag, true)}
                    />
                )}
            </section>
        </section>
    );
}