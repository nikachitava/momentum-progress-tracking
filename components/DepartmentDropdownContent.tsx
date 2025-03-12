import { IDepartmentReqResponse } from "@/types/IDepartmentReqResponse";
import React, { useState } from "react";
import DropdownCheckboxItem from "./DropdownCheckboxItem";
import CustomButton from "./CustomButton";

const DepartmentDropdownContent = ({
    departments,
}: {
    departments: IDepartmentReqResponse[];
}) => {
    const [selectedDepartments, setSelectedDepartments] = useState<number[]>(
        []
    );

    const handleSelect = (id: number) => {
        setSelectedDepartments((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((depId) => depId !== id)
                : [...prevSelected, id]
        );
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    console.log("selected Departments: ", selectedDepartments);

    return (
        <div
            className="absolute left-0 right-0 top-full z-20 mt-[11px] w-[688px] border-[0.5px] border-[#8338EC] rounded-[10px] px-[30px] py-10 space-y-[22px]"
            onClick={handleContentClick}
        >
            {departments.map((dep) => (
                <DropdownCheckboxItem
                    key={dep.id}
                    title={dep.name}
                    isSelected={selectedDepartments.includes(dep.id)}
                    onSelect={() => handleSelect(dep.id)}
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

export default DepartmentDropdownContent;
