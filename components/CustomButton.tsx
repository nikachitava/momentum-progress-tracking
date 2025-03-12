"use client";

import { ICustomButton } from "@/types/ICustomButton";

const CustomButton: React.FC<ICustomButton> = ({
    title,
    onClick,
    icon,
    otherStyles,
}) => {
    return (
        <button
            className={`px-5 py-[10px] rounded-[5px] cursor-pointer flex items-center gap-1 whitespace-nowrap ${otherStyles}`}
            onClick={onClick}
        >
            {icon && <>{icon}</>}
            {title}
        </button>
    );
};

export default CustomButton;
