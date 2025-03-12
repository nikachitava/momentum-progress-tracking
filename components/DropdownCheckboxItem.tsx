import { IDropdownCheckboxItem } from "@/types/IDropdownCheckboxItem";
import React from "react";

const DropdownCheckboxItem: React.FC<IDropdownCheckboxItem> = ({
    title,
    isSelected,
    icon,
    onSelect,
}) => {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    console.log("rac mivige icon link:", icon);

    return (
        <div onClick={handleClick} className="flex items-center gap-[15px]">
            <div className="relative size-[22px]">
                <div
                    className={`absolute size-[22px] rounded-[6px] border-[1.5px] border-grey-shades-headlines`}
                >
                    <input
                        type="checkbox"
                        className="absolute size-[22px] opacity-0 cursor-pointer"
                        checked={isSelected}
                        onChange={onSelect}
                    />
                    {isSelected && (
                        <svg
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-[14px] pointer-events-none"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.6667 5L7.5 14.1667L3.33334 10"
                                stroke="#212529"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-[10px]">
                {icon && (
                    <img
                        src={icon}
                        alt="user_avatar"
                        className="size-[28px] rounded-full bg-center object-contain"
                    />
                )}
                <span className="text-lighttext text-[14px]">{title}</span>
            </div>
        </div>
    );
};

export default DropdownCheckboxItem;
