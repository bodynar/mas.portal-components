export type Author = {
    id: string;
    name: string;
    email: string;
};

export type Statistics = {
    views: number;
    likes: number;
    dislikes: number;
};

export type TagItem = {
    id: string;
    name: string;
    color: string;
};

export type ArticleItem = {
    id: string;
    name: string;
    description: string;
    category: string;
    author: Author;
    stats: Statistics;
    postedAt: Date;
    isArchieved: boolean;
    tags: Array<TagItem>;
};