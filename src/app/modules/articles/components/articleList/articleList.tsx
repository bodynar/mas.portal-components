import React from 'react';

import './articleList.scss';

import generateUid from '../../../../common/uid';
import { has, isNullOrUndefined } from '../../../../common/utils';

import { ArticleItem, SortOrder } from '../../types';
import { filterAndSortArticles, getPageItems } from '../../utils';

import { SelectableItem } from '../dropdown/types';
import { TagItem } from '../tags/types';
import { Paginator, PageInfo, initPageSize } from '../paginator';

import Dropdown from '../dropdown/dropdown';
import Search from '../search/search';
import Checkbox from '../checkbox/checkbox';
import Tags from '../tags/tags';
import Article from '../articleItem/articleItem';

type ArticleListProps = {
    items: Array<ArticleItem>;
};

type ArticleListState = {
    filteredArticles: Array<ArticleItem>;
    pageArticles: Array<ArticleItem>;
    activeTags: Array<TagItem>;
    displayArchieved: boolean;
    searchQuery: string;
    pageInfo: PageInfo;
    sortOrder?: SortOrder<ArticleItem>;
};

const defaultPageInfo: PageInfo = { start: 0, end: initPageSize };

export default function ArticleList(props: ArticleListProps): JSX.Element {
    const filteredArticles: Array<ArticleItem> =
        filterAndSortArticles(props.items, false, [], '', { fieldName: 'postedAt', order: 'desc' });

    const [state, setState] = React.useState<ArticleListState>({
        activeTags: [],
        displayArchieved: false,
        searchQuery: '',
        sortOrder: { fieldName: 'postedAt', order: 'desc' },
        filteredArticles: filteredArticles,
        pageInfo: defaultPageInfo,
        pageArticles: getPageItems(filteredArticles, defaultPageInfo)
    });

    const onDisplayArchievedToggle = React.useCallback(
        (displayArchieved: boolean): void => {
            const filteredArticles: Array<ArticleItem> =
                filterAndSortArticles(props.items, displayArchieved, state.activeTags, state.searchQuery, state.sortOrder);

            setState({
                ...state,
                displayArchieved: displayArchieved,
                filteredArticles: filteredArticles,
                pageArticles: getPageItems(filteredArticles, state.pageInfo),
            });
        }, [state, props.items]);

    const onSearchQueryChange = React.useCallback(
        (searchQuery: string): void => {
            if (state.searchQuery.length > 0 && searchQuery.length === 0) {
                const filteredArticles: Array<ArticleItem> =
                    filterAndSortArticles(props.items, state.displayArchieved, state.activeTags, searchQuery, state.sortOrder);

                setState({
                    ...state,
                    searchQuery: searchQuery,
                    filteredArticles: filteredArticles,
                    pageArticles: getPageItems(filteredArticles, state.pageInfo)
                });
            } else {
                setState({
                    ...state,
                    searchQuery: searchQuery
                });
            }
        }, [state, props.items]);

    const onSearchClick = React.useCallback(
        (): void => {
            const filteredArticles: Array<ArticleItem> =
                filterAndSortArticles(props.items, state.displayArchieved, state.activeTags, state.searchQuery, state.sortOrder);

            setState({
                ...state,
                filteredArticles: filteredArticles,
                pageArticles: getPageItems(filteredArticles, state.pageInfo)
            });
        }, [state, props.items]);

    const onSortOrderChange = React.useCallback(
        (sortOrder: SortOrder<ArticleItem>): void => {
            if (!isNullOrUndefined(sortOrder)) {
                const filteredArticles: Array<ArticleItem> =
                    filterAndSortArticles(props.items, state.displayArchieved, state.activeTags, state.searchQuery, sortOrder);

                setState({
                    ...state,
                    sortOrder: sortOrder,
                    filteredArticles: filteredArticles,
                    pageArticles: getPageItems(filteredArticles, state.pageInfo)
                });
            }
        }, [state, props.items]);

    const onTagAdd = React.useCallback(
        (tag: TagItem) => {
            if (!isNullOrUndefined(tag)) {
                const tags: Array<TagItem> =
                    has(state.activeTags, tag)
                        ? state.activeTags
                        : [...state.activeTags, tag];

                const filteredArticles: Array<ArticleItem> =
                    filterAndSortArticles(props.items, state.displayArchieved, tags, state.searchQuery, state.sortOrder);

                setState({
                    ...state,
                    activeTags: tags,
                    filteredArticles: filteredArticles,
                    pageArticles: getPageItems(filteredArticles, state.pageInfo)
                });
            }
        }, [state, props.items]);

    const onTagRemove = React.useCallback(
        (tag: TagItem) => {
            if (!isNullOrUndefined(tag)) {
                const tags: Array<TagItem> =
                    has(state.activeTags, tag)
                        ? state.activeTags.filter(x => x !== tag)
                        : state.activeTags;

                const filteredArticles: Array<ArticleItem> =
                    filterAndSortArticles(props.items, state.displayArchieved, tags, state.searchQuery, state.sortOrder);

                setState({
                    ...state,
                    activeTags: tags,
                    filteredArticles: filteredArticles,
                    pageArticles: getPageItems(filteredArticles, state.pageInfo)
                });
            }
        }, [state, props.items]);

    const onPageChange = React.useCallback(
        (pageInfo: PageInfo): void => {
            if (!isNullOrUndefined(pageInfo)) {
                setState({
                    ...state,
                    pageInfo: pageInfo,
                    pageArticles: getPageItems(state.filteredArticles, pageInfo)
                });
            }
        }, [state]);

    return (
        <section className="article-list">
            <section className="article-list__filters">
                <section>
                    <OrderDropdown
                        onSortOrderChange={onSortOrderChange}
                    />
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
                </section>
                <div>
                    <Tags
                        tags={state.activeTags}
                        onDelete={onTagRemove}
                    />
                </div>
            </section>
            <section className="article-list__items">
                {state.pageArticles.map(article =>
                    <Article
                        key={article.id}
                        article={article}
                        onTagClick={onTagAdd}
                    />
                )}
            </section>
            <div className="article-list__paginator">
                {state.filteredArticles.length > 0 &&
                    <Paginator
                        itemsCount={state.filteredArticles.length}
                        onPageChange={onPageChange}
                    />
                }
            </div>
        </section>
    );
}

const orderOptions: Array<SelectableItem> = [
    { id: generateUid(), displayValue: 'Date', args: { fieldName: 'postedAt', order: 'desc' } },
    { id: generateUid(), displayValue: 'Date', args: { fieldName: 'postedAt', order: 'asc' } },
    { id: generateUid(), displayValue: 'Popularity', args: { fieldName: 'stats.views', order: 'desc' } },
    { id: generateUid(), displayValue: 'Popularity', args: { fieldName: 'stats.views', order: 'asc' } },
];

const orderOptionTemplateData: Map<string, string> =
    new Map(orderOptions.map(({ id }, index) =>
        [id, index % 2 === 0 ? 'fa-sort-amount-down-alt' : 'fa-sort-amount-up-alt']));

const OrderDropdown = (props: {
    onSortOrderChange: (sortOrder: SortOrder<ArticleItem>) => void;
}): JSX.Element => {
    const displayValueTemplateGenerator = React.useCallback(
        (item: SelectableItem): JSX.Element => {
            return (
                <>
                    <i className={`fas ${orderOptionTemplateData.get(item.id)}`} aria-hidden="true"></i>{item.displayValue}
                </>
            );
        }, []);

    const onSortOrderChange = React.useCallback
        ((item?: SelectableItem): void => {
            if (!isNullOrUndefined(item) && !isNullOrUndefined(item.args)) {
                props.onSortOrderChange({
                    fieldName: item.args['fieldName'],
                    order: item.args['order']
                });
            }
        }, [props]);

    return (
        <Dropdown
            caption='Please select'
            canDeselect={false}
            items={orderOptions}
            onItemSelect={onSortOrderChange}
            selectedItem={orderOptions[0]}
            displayValueTemplateGenerator={displayValueTemplateGenerator}
        />
    );
};