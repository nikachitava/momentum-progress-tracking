import { IDepartmentReqResponse } from "./IDepartmentReqResponse";
import { IEmployeesReqResponse } from "./IEmployeesReqResponse";
import { IPrioritiesReqResponse } from "./IPrioritiesReqResponse";

export interface IFilterMenuContext {
    selectedDepartments: IDepartmentReqResponse[];
    setSelectedDepartments: React.Dispatch<React.SetStateAction<IDepartmentReqResponse[]>>;
    removeDepartment: (id: number) => void;

    selectedPriorities: IPrioritiesReqResponse[];
    setSelectedPriorities: React.Dispatch<React.SetStateAction<IPrioritiesReqResponse[]>>;
    removePriority: (id: number) => void;

    selectedEmployees: IEmployeesReqResponse[];
    setSelectedEmployees: React.Dispatch<React.SetStateAction<IEmployeesReqResponse[]>>;
    removeEmployee: (id: number) => void;

    clearFilter: () => void;
}
