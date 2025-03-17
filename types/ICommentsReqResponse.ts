export interface IComment {
    id: number;
    text: string;
    task_id: number;
    parent_id: number | null;
    author_avatar: string;
    author_nickname: string;
    sub_comments: ISubComment[];
}

export interface ISubComment {
    id: number;
    text: string;
    task_id: number;
    parent_id: number;
    author_avatar: string;
    author_nickname: string;
}
