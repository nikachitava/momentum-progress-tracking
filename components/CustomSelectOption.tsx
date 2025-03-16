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
    defaultValue = "",
    disabled = false,
    icon = false,
}) => {
    const {
        register,
        setValue,
        watch,
        formState: { errors, isSubmitted },
    } = useFormContext();

    const value = watch(name) || "";
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized && defaultValue) {
            setValue(name, defaultValue, { shouldValidate: true });
            setIsInitialized(true);
        }
    }, [defaultValue, name, setValue, isInitialized]);

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
        if (!disabled) {
            setValue(name, optionValue, { shouldValidate: true });
            setIsOpen(false);
        }
    };

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const showValidation = isSubmitted;

    const getLabelClassName = () => {
        if (disabled) return "text-gray-400";
        if (!showValidation) return "text-grey-shades-subheadlines";

        if (errors[name]) return "text-red";
        if (allRequirementsValid) return "text-green";
        return "text-grey-shades-subheadlines";
    };

    const getBorderClassName = () => {
        if (disabled) return "border-gray-200 bg-gray-100";
        if (!showValidation) return "border-[#CED4DA]";

        if (errors[name]) return "border-red";
        if (allRequirementsValid) return "border-green";
        return "border-[#CED4DA]";
    };

    return (
        <div className={`relative`}>
            <label
                htmlFor={name}
                className={`block text-sm font-medium mb-[3px] ${getLabelClassName()}`}
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
                    disabled={disabled}
                />

                <button
                    type="button"
                    onClick={toggleDropdown}
                    disabled={disabled}
                    className={`w-full flex items-center justify-between border rounded-[6px] p-[14px] outline-none ${getBorderClassName()} ${
                        disabled ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                >
                    <div className="flex items-center gap-[6px]">
                        {icon &&
                            value &&
                            options.find((opt) => opt.value === value)
                                ?.icon && (
                                <img
                                    src={
                                        options.find(
                                            (opt) => opt.value === value
                                        )?.icon
                                    }
                                    alt="icon"
                                    className="size-[16px] rounded-full bg-center object-cover"
                                />
                            )}
                        <span
                            className={`text-xs ${
                                selectedLabel
                                    ? disabled
                                        ? "text-gray-400"
                                        : ""
                                    : "text-grey-shades-validations"
                            }`}
                        >
                            {selectedLabel || placeholder}
                        </span>
                    </div>
                    {isOpen ? (
                        <IoIosArrowUp
                            className={
                                disabled
                                    ? "text-gray-400"
                                    : "text-grey-shades-validations"
                            }
                        />
                    ) : (
                        <IoIosArrowDown
                            className={
                                disabled
                                    ? "text-gray-400"
                                    : "text-grey-shades-validations"
                            }
                        />
                    )}
                </button>

                {isOpen && !disabled && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#CED4DA] rounded-[6px] shadow-lg max-h-60 overflow-auto">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`flex items-center gap-[6px] p-[10px] cursor-pointer hover:bg-gray-100 ${
                                    option.value === value
                                        ? "bg-gray-50 font-medium"
                                        : ""
                                }`}
                            >
                                {icon && (
                                    <img
                                        src={option.icon}
                                        alt="icon"
                                        className="size-[28px] rounded-full bg-center object-cover"
                                    />
                                )}
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {errors[name] && showValidation && !disabled && (
                <p className="mt-1 text-xs text-red">
                    {errors[name]?.message?.toString()}
                </p>
            )}
        </div>
    );
};
