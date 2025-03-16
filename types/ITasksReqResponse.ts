interface IDepartment {
    id: number;
    name: string;
}

interface IEmployee {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department: IDepartment;
}

interface IStatus {
    id: number;
    name: string;
}

interface IPriority {
    id: number;
    name: string;
    icon: string;
}

export interface ITasksReqResponse {
    id: number;
    name: string;
    description: string;
    due_date: string; 
    department: IDepartment;
    employee: IEmployee;
    status: IStatus;
    priority: IPriority;
    total_comments: number;
}