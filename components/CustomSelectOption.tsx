import { ICustomSelectOption } from "@/types/ICustomSelectOption";
import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const CustomSelectOption: React.FC<ICustomSelectOption> = ({
    name,
    label,
    placeholder = "",
    options = [],
    requirements = [],
}) => {
    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const value = watch(name) || "";
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const selectedOption = options.find((option) => option.value === value);
        setSelectedLabel(selectedOption ? selectedOption.label : "");
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const allRequirementsValid =
        value !== "" &&
        (requirements.length === 0 ||
            requirements.every((req) => req.validator(value)));

    const { ref, ...rest } = register(name);

    const handleSelect = (optionValue: string) => {
        setValue(name, optionValue, { shouldValidate: true });
        setIsOpen(false);
    };

    return (
        <div
            className={`relative ${
                errors[name] ? "border border-red rounded-[6px]" : ""
            }`}
        >
            <label
                htmlFor={name}
                className="block text-sm font-medium text-grey-shades-subheadlines mb-[3px]"
            >
                {label}
            </label>

            <div ref={dropdownRef} className="relative">
                <input
                    type="hidden"
                    {...rest}
                    name={name}
                    id={name}
                    ref={ref}
                    value={value}
                />

                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full flex items-center justify-between border bg-white rounded-[6px] p-[10px] outline-none ${
                        errors[name]
                            ? "border-red"
                            : allRequirementsValid
                            ? "border-green"
                            : "border-[#CED4DA]"
                    }`}
                >
                    <span
                        className={`text-xs ${
                            selectedLabel ? "" : "text-grey-shades-validations"
                        }`}
                    >
                        {selectedLabel || placeholder}
                    </span>
                    {isOpen ? (
                        <IoIosArrowUp className="text-grey-shades-validations" />
                    ) : (
                        <IoIosArrowDown className="text-grey-shades-validations" />
                    )}
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#CED4DA] rounded-[6px] shadow-lg max-h-60 overflow-auto">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`p-[10px] cursor-pointer hover:bg-gray-100 ${
                                    option.value === value
                                        ? "bg-gray-50 font-medium"
                                        : ""
                                }`}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {errors[name] && (
                <p className="mt-1 text-xs text-red">
                    {errors[name]?.message?.toString()}
                </p>
            )}
        </div>
    );
};
