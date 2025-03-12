import { IDepartmentReqResponse } from "./IDepartmentReqResponse";
import { IEmployeesReqResponse } from "./IEmployeesReqResponse";
import { IPrioritiesReqResponse } from "./IPrioritiesReqResponse";

export interface IFilterMenu {
    departments: IDepartmentReqResponse[],
    priorities: IPrioritiesReqResponse[],
    employees: IEmployeesReqResponse[] 
}