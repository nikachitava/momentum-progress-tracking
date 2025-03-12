import { IPrioritiesReqResponse } from "@/types/IPrioritiesReqResponse";
import React, { useState } from "react";
import DropdownCheckboxItem from "./DropdownCheckboxItem";
import CustomButton from "./CustomButton";

const PriorityDropdownContent = ({
    priorities,
}: {
    priorities: IPrioritiesReqResponse[];
}) => {
    const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);

    const handleSelect = (id: number) => {
        setSelectedPriorities((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((priorityId) => priorityId !== id)
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
            {priorities.map((priority) => (
                <DropdownCheckboxItem
                    key={priority.id}
                    title={priority.name}
                    isSelected={selectedPriorities.includes(priority.id)}
                    onSelect={() => handleSelect(priority.id)}
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

export default PriorityDropdownContent;
