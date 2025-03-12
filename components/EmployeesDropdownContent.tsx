import { IEmployeesReqResponse } from "@/types/IEmployeesReqResponse";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import DropdownCheckboxItem from "./DropdownCheckboxItem";

const EmployeesDropdownContent = ({
    employees,
}: {
    employees: IEmployeesReqResponse[];
}) => {
    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

    const handleSelect = (id: number) => {
        setSelectedEmployees((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((implyId) => implyId !== id)
                : [...prevSelected, id]
        );
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className="absolute left-0 right-0 top-full z-20 mt-[11px] w-[688px] border-[0.5px] border-[#8338EC] rounded-[10px] px-[30px] py-10 space-y-[22px] bg-white"
            onClick={handleContentClick}
        >
            {employees.map((employee) => (
                <DropdownCheckboxItem
                    key={employee.id}
                    title={employee.name + " " + employee.surname}
                    isSelected={selectedEmployees.includes(employee.id)}
                    onSelect={() => handleSelect(employee.id)}
                    icon={employee.avatar}
                />
            ))}

            <div className="flex justify-end">
                <CustomButton
                    title="არჩევა"
                    onClick={() => {}}
                    otherStyles="bg-purple-accent text-white rounded-[20px] !px-[20px] !py-2"
                    fill={true}
                />
            </div>
        </div>
    );
};

export default EmployeesDropdownContent;
