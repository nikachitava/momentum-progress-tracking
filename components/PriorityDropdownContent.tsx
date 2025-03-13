import { IPrioritiesReqResponse } from "@/types/IPrioritiesReqResponse";
import React, { useContext, useState } from "react";
import DropdownCheckboxItem from "./DropdownCheckboxItem";
import CustomButton from "./CustomButton";
import { FilterMenuContext } from "@/context/FilterMenuContext";

const PriorityDropdownContent = ({
    priorities,
}: {
    priorities: IPrioritiesReqResponse[];
}) => {
    const { selectedPriorities, setSelectedPriorities } =
        useContext(FilterMenuContext);

    const [tempSelectedPriorities, setTempSelectedPriorities] =
        useState<IPrioritiesReqResponse[]>(selectedPriorities);

    const handleSelect = (priority: IPrioritiesReqResponse) => {
        setTempSelectedPriorities((prevSelected) =>
            prevSelected.some((p) => p.id === priority.id)
                ? prevSelected.filter((p) => p.id !== priority.id)
                : [...prevSelected, priority]
        );
    };

    const handleConfirmSelection = () => {
        setSelectedPriorities(tempSelectedPriorities);
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className="absolute left-0 right-0 top-full z-20 mt-[11px] w-[688px] border-[0.5px] border-[#8338EC] rounded-[10px] px-[30px] py-10 space-y-[22px] bg-white"
            onClick={handleContentClick}
        >
            {priorities.map((priority) => (
                <DropdownCheckboxItem
                    key={priority.id}
                    title={priority.name}
                    isSelected={tempSelectedPriorities.some(
                        (p) => p.id === priority.id
                    )}
                    onSelect={() => handleSelect(priority)}
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

export default PriorityDropdownContent;
