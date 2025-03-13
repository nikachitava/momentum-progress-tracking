"use client";

import { IFilterMenuContext } from "@/types/IFilterMenuContext";
import { createContext, useState } from "react";

const CONTEXT_DEFAULT_VALUES: IFilterMenuContext = {
    selectedDepartments: [],
    setSelectedDepartments: () => {},
    selectedPriorities: [],
    setSelectedPriorities: () => {},
    selectedEmployees: [],
    setSelectedEmployees: () => {},
};

export const FilterMenuContext = createContext<IFilterMenuContext>(
    CONTEXT_DEFAULT_VALUES
);

export const FilterMenuProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [selectedDepartments, setSelectedDepartments] = useState<number[]>(
        []
    );

    const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

    return (
        <FilterMenuContext.Provider
            value={{
                selectedDepartments,
                setSelectedDepartments,
                selectedPriorities,
                setSelectedPriorities,
                selectedEmployees,
                setSelectedEmployees,
            }}
        >
            {children}
        </FilterMenuContext.Provider>
    );
};
