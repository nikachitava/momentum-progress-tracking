export interface ITaskCard {
    priority: {
        id: number;
        name: string;
        icon: string;
    };
    department: {
        id: number;
        name: string;
    };
    due_date: string;
    name: string;
    description: string;
    avatar: string;
    total_comments: number;
    borderColor: string;
}