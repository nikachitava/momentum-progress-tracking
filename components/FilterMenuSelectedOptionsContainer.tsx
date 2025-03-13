import { FilterMenuContext } from "@/context/FilterMenuContext";
import React, { useContext } from "react";
import FilterMenuSelectedOptionItem from "./FilterMenuSelectedOptionItem";

const FilterMenuSelectedOptions = () => {
    const {
        selectedDepartments,
        selectedEmployees,
        selectedPriorities,
        removeDepartment,
        removeEmployee,
        removePriority,
    } = useContext(FilterMenuContext);

    return (
        <div className="mt-[25px] space-x-2 space-y-2">
            {selectedDepartments.map((dep) => (
                <FilterMenuSelectedOptionItem
                    key={dep.id}
                    title={dep.name}
                    onRemove={() => removeDepartment(dep.id)}
                />
            ))}
            {selectedEmployees.map((emp) => (
                <FilterMenuSelectedOptionItem
                    key={emp.id}
                    title={emp.name + " " + emp.surname}
                    onRemove={() => removeEmployee(emp.id)}
                />
            ))}
            {selectedPriorities.map((p) => (
                <FilterMenuSelectedOptionItem
                    key={p.id}
                    title={p.name}
                    onRemove={() => removePriority(p.id)}
                />
            ))}
        </div>
    );
};

export default FilterMenuSelectedOptions;
