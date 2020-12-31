import { hasIn, isNullOrEmpty } from "../../common/utils";

import { ArticleItem, TagItem } from "./types";

export const filterArticles = (
    items: Array<ArticleItem>,
    displayArchieved: boolean,
    activeTags: Array<TagItem>,
    searchQuery: string
): Array<ArticleItem> => {
    return [...items]
        .filter(x => displayArchieved || x.isArchieved)
        .filter(x => activeTags.length === 0 || hasIn(activeTags, x.tags))
        .filter(x => isNullOrEmpty(searchQuery) || x.name.toLowerCase().includes(searchQuery.toLowerCase()));
};