import React from "react";
import { IFilterMenuSelectedOptionItem } from "@/types/IFilterMenuSelectedOptionItem";
import { IoMdClose } from "react-icons/io";

const FilterMenuSelectedOptionItem: React.FC<IFilterMenuSelectedOptionItem> = ({
    title,
    onRemove,
}) => {
    return (
        <div className="inline-flex items-center gap-1 border border-[#CED4DA] rounded-[43px] py-[6px] px-[10px]">
            <span className="text-sm text-grey-shades-subheadlines">
                {title}
            </span>
            <IoMdClose
                onClick={onRemove}
                color="#343A40"
                className="cursor-pointer"
            />
        </div>
    );
};

export default FilterMenuSelectedOptionItem;
