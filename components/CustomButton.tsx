"use client";

import { ICustomButton } from "@/types/ICustomButton";

const CustomButton: React.FC<ICustomButton> = ({
    title,
    onClick,
    icon,
    fill = false,
    otherStyles,
}) => {
    return (
        <button
            className={`px-5 py-[10px] rounded-[5px] cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                fill ? "hover:bg-[#B588F4]" : "hover:border-[#B588F4]"
            } ${otherStyles}`}
            onClick={onClick}
        >
            {icon && <>{icon}</>}
            {title}
        </button>
    );
};

export default CustomButton;
