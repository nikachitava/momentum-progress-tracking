"use client";

import { IDepartmentReqResponse } from "@/types/IDepartmentReqResponse";
import { IEmployeesReqResponse } from "@/types/IEmployeesReqResponse";
import { IFilterMenuContext } from "@/types/IFilterMenuContext";
import { IPrioritiesReqResponse } from "@/types/IPrioritiesReqResponse";
import { createContext, useState } from "react";

const CONTEXT_DEFAULT_VALUES: IFilterMenuContext = {
    selectedDepartments: [],
    setSelectedDepartments: () => {},
    removeDepartment: () => {},

    selectedPriorities: [],
    setSelectedPriorities: () => {},
    removePriority: () => {},

    selectedEmployees: [],
    setSelectedEmployees: () => {},
    removeEmployee: () => {},
};

export const FilterMenuContext = createContext<IFilterMenuContext>(
    CONTEXT_DEFAULT_VALUES
);

export const FilterMenuProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [selectedDepartments, setSelectedDepartments] = useState<
        IDepartmentReqResponse[]
    >([]);

    const [selectedPriorities, setSelectedPriorities] = useState<
        IPrioritiesReqResponse[]
    >([]);
    const [selectedEmployees, setSelectedEmployees] = useState<
        IEmployeesReqResponse[]
    >([]);

    const removeDepartment = (id: number) => {
        setSelectedDepartments((prev) => prev.filter((dep) => dep.id !== id));
    };

    const removePriority = (id: number) => {
        setSelectedPriorities((prev) => prev.filter((dep) => dep.id !== id));
    };

    const removeEmployee = (id: number) => {
        setSelectedEmployees((prev) => prev.filter((dep) => dep.id !== id));
    };

    return (
        <FilterMenuContext.Provider
            value={{
                selectedDepartments,
                setSelectedDepartments,
                removeDepartment,
                selectedPriorities,
                setSelectedPriorities,
                removePriority,
                selectedEmployees,
                setSelectedEmployees,
                removeEmployee,
            }}
        >
            {children}
        </FilterMenuContext.Provider>
    );
};
