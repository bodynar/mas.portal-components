import React from 'react';

import generateUid from '../../common/uid';

import ArticleList from './components/articleList/articleList';

import { ArticleItem, Author } from './types';

export default function ArticlesPage(): JSX.Element {
    const mockAuthor: Author = {
        id: generateUid(),
        name: 'Test Admin',
        email: 'test@test.test',
    };

    const mockArticles: Array<ArticleItem> =
        new Array(200)
            .fill({
                id: generateUid(),
                name: 'Test article',
                description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus reiciendis voluptatem suscipit enim. Blanditiis iure, numquam praesentium repellat culpa aut illum unde eveniet, fuga suscipit neque veritatis non nemo delectus.',
                category: 'Test',
                author: mockAuthor,
                stats: {
                    views: 10,
                    likes: 5,
                    dislikes: 4
                },
                postedAt: new Date(),
                isArchieved: false,
                tags: []
            } as ArticleItem)
            .map((item, index) => ({
                ...item,
                id: generateUid(),
                name: `${item.name} ${index}`,
            } as ArticleItem))
            .map((item, index) => ({
                ...item,
                name: index % 4 === 0
                    ? `[Arch] ${item.name}`
                    : item.name,
                isArchieved: index % 4 === 0
            } as ArticleItem))
            .map((item, index) => ({
                ...item,
                stats: {
                    views: (item.stats.views * 5) - (index * 2),
                    likes: (item.stats.likes * 3) - (index * 2),
                    dislikes: (item.stats.dislikes * 4) - (index * 2)
                }
            } as ArticleItem))
            .map((item, index) => ({
                ...item,
                postedAt: new Date(index * 10, 2, 1)
            } as ArticleItem))
        ;
    return (
        <>
            <ArticleList
                items={mockArticles}
            />
        </>
    );
};