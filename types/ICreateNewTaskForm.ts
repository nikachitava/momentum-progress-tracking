import { IDepartmentReqResponse } from "./IDepartmentReqResponse";
import { IEmployeesReqResponse } from "./IEmployeesReqResponse";
import { IPrioritiesReqResponse } from "./IPrioritiesReqResponse";
import { IStatusesReqResponse } from "./IStatusesReqResponse";

export interface ICreateNewTaskForm {
    departments: IDepartmentReqResponse[];
    priorities: IPrioritiesReqResponse[];
    employees: IEmployeesReqResponse[];
    statuses: IStatusesReqResponse[];
}
