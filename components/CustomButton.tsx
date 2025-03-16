"use client";

import { ICustomButton } from "@/types/ICustomButton";

const CustomButton: React.FC<ICustomButton> = ({
    title,
    onClick,
    icon,
    fill = false,
    otherStyles,
    type = "submit",
    submitting = false,
}) => {
    return (
        <button
            className={`px-5 py-[10px] rounded-[5px] cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                fill ? "hover:bg-[#B588F4]" : "hover:border-[#B588F4]"
            } ${otherStyles} ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={onClick}
            type={type}
            disabled={submitting}
        >
            {icon && <>{icon}</>}
            {submitting ? (
                <div className="flex items-center gap-2">
                    <span>იტვირთება...</span>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                title
            )}
        </button>
    );
};

export default CustomButton;
