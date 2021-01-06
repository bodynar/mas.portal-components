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

    const mockArticles: Array<ArticleItem> = [
        {
            id: generateUid(),
            name: 'Test article 1',
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
        },
        {
            id: generateUid(),
            name: '[Arch] Test article 2',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus reiciendis voluptatem suscipit enim. Blanditiis iure, numquam praesentium repellat culpa aut illum unde eveniet, fuga suscipit neque veritatis non nemo delectus.',
            category: 'Test',
            author: mockAuthor,
            stats: {
                views: 10,
                likes: 5,
                dislikes: 4
            },
            postedAt: new Date(),
            isArchieved: true,
            tags: []
        },
        {
            id: generateUid(),
            name: '[Arch] Test article 3',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus reiciendis voluptatem suscipit enim. Blanditiis iure, numquam praesentium repellat culpa aut illum unde eveniet, fuga suscipit neque veritatis non nemo delectus.',
            category: 'Test',
            author: mockAuthor,
            stats: {
                views: 10,
                likes: 5,
                dislikes: 4
            },
            postedAt: new Date(),
            isArchieved: true,
            tags: []
        },
    ];

    return (
        <>
            <ArticleList
                items={mockArticles}
            />
        </>
    );
};