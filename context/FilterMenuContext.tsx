"use client";

import { IDepartmentReqResponse } from "@/types/IDepartmentReqResponse";
import { IEmployeesReqResponse } from "@/types/IEmployeesReqResponse";
import { IFilterMenuContext } from "@/types/IFilterMenuContext";
import { IPrioritiesReqResponse } from "@/types/IPrioritiesReqResponse";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

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

    clearFilter: () => {},
};

export const FilterMenuContext = createContext<IFilterMenuContext>(
    CONTEXT_DEFAULT_VALUES
);

export const FilterMenuProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathname = usePathname();
    const storageKey = "filterState";

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

    const clearFilter = () => {
        setSelectedDepartments([]);
        setSelectedPriorities([]);
        setSelectedEmployees([]);
    };

    useEffect(() => {
        const savedPathname = localStorage.getItem("filterPathname");

        if (savedPathname === pathname) {
            const savedState = localStorage.getItem(storageKey);
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                setSelectedDepartments(parsedState.departments || []);
                setSelectedPriorities(parsedState.priorities || []);
                setSelectedEmployees(parsedState.employees || []);
            }
        } else {
            localStorage.removeItem(storageKey);
            localStorage.setItem("filterPathname", pathname);
        }
    }, [pathname]);

    useEffect(() => {
        const filterState = {
            departments: selectedDepartments,
            priorities: selectedPriorities,
            employees: selectedEmployees,
        };

        localStorage.setItem(storageKey, JSON.stringify(filterState));
        localStorage.setItem("filterPathname", pathname);
    }, [selectedDepartments, selectedPriorities, selectedEmployees, pathname]);

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
                clearFilter,
            }}
        >
            {children}
        </FilterMenuContext.Provider>
    );
};
