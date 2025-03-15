import { IEmployeesReqResponse } from "@/types/IEmployeesReqResponse";
import React, { useContext, useState } from "react";
import CustomButton from "./CustomButton";
import DropdownCheckboxItem from "./DropdownCheckboxItem";
import { FilterMenuContext } from "@/context/FilterMenuContext";

const EmployeesDropdownContent = ({
    employees,
}: {
    employees: IEmployeesReqResponse[];
}) => {
    const { selectedEmployees, setSelectedEmployees } =
        useContext(FilterMenuContext);

    const [tempSelectedEmployees, setTempSelectedEmployees] =
        useState<IEmployeesReqResponse[]>(selectedEmployees);

    const handleSelect = (employee: IEmployeesReqResponse) => {
        setTempSelectedEmployees((prevSelected) =>
            prevSelected.some((emp) => emp.id === employee.id)
                ? prevSelected.filter((emp) => emp.id !== employee.id)
                : [...prevSelected, employee]
        );
    };

    const handleConfirmSelection = () => {
        setSelectedEmployees(tempSelectedEmployees);
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className="absolute max-h-[274px] overflow-auto left-0 right-0 top-full z-20 mt-[11px] w-[688px] border-[0.5px] border-[#8338EC] rounded-[10px] px-[30px] py-10 space-y-[22px] bg-white"
            onClick={handleContentClick}
        >
            {employees.map((employee) => (
                <DropdownCheckboxItem
                    key={employee.id}
                    title={employee.name + " " + employee.surname}
                    isSelected={tempSelectedEmployees.some(
                        (emp) => emp.id === employee.id
                    )}
                    onSelect={() => handleSelect(employee)}
                    icon={employee.avatar}
                />
            ))}

            <div className="flex justify-end">
                <CustomButton
                    title="არჩევა"
                    onClick={handleConfirmSelection}
                    otherStyles="bg-purple-accent text-white rounded-[20px] !px-[20px] !py-2"
                    fill={true}
                />
            </div>
        </div>
    );
};

export default EmployeesDropdownContent;
