export interface IEmployeesReqResponse {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department: {
        id: number;
        name: string;
    };
}