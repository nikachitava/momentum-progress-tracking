"use client";

import React, { useEffect, useRef } from "react";
import { IFilterMenuItem } from "@/types/IFilterMenuItem";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

const FilterMenuItem: React.FC<IFilterMenuItem> = ({
    title,
    isOpen,
    onClick,
    children,
}) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                onClick();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClick]);
    return (
        <div
            className="max-w-[199px] flex items-center gap-2 px-[18px] py-[12.5px] cursor-pointer"
            onClick={onClick}
            ref={menuRef}
        >
            <span
                className={`font-normal ${
                    isOpen ? "text-purple-accent" : "text-grey-shades-blackish"
                }`}
            >
                {title}
            </span>
            {isOpen ? (
                <FaAngleDown size={14} className="text-purpule-accent" />
            ) : (
                <FaAngleUp size={14} className="text-grey-shades-blackish" />
            )}

            {isOpen && <>{children}</>}
        </div>
    );
};

export default FilterMenuItem;
