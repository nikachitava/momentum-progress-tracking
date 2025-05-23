import { IDepartmentReqResponse } from "@/types/IDepartmentReqResponse";
import React, { useContext, useState } from "react";
import DropdownCheckboxItem from "./DropdownCheckboxItem";
import CustomButton from "./CustomButton";
import { FilterMenuContext } from "@/context/FilterMenuContext";

const DepartmentDropdownContent = ({
    departments,
}: {
    departments: IDepartmentReqResponse[];
}) => {
    const { selectedDepartments, setSelectedDepartments } =
        useContext(FilterMenuContext);

    const [tempSelectedDepartments, setTempSelectedDepartments] =
        useState<IDepartmentReqResponse[]>(selectedDepartments);

    const handleSelect = (department: IDepartmentReqResponse) => {
        setTempSelectedDepartments((prevSelected) =>
            prevSelected.some((dep) => dep.id === department.id)
                ? prevSelected.filter((dep) => dep.id !== department.id)
                : [...prevSelected, department]
        );
    };

    const handleConfirmSelection = () => {
        setSelectedDepartments(tempSelectedDepartments);
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    console.log("selected Departments: ", selectedDepartments);

    return (
        <div
            className="absolute max-h-[274px] overflow-auto left-0 right-0 top-full z-20 mt-[11px] w-[688px] border-[0.5px] border-[#8338EC] rounded-[10px] px-[30px] py-10 space-y-[22px] bg-white"
            onClick={handleContentClick}
        >
            {departments.map((dep) => (
                <DropdownCheckboxItem
                    key={dep.id}
                    title={dep.name}
                    isSelected={tempSelectedDepartments.some(
                        (selectedDep) => selectedDep.id === dep.id
                    )}
                    onSelect={() => handleSelect(dep)}
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

export default DepartmentDropdownContent;
