import { ICustomTextArea } from "@/types/ICustomTextArea";
import React from "react";
import { useFormContext } from "react-hook-form";
import { IoCheckmarkSharp } from "react-icons/io5";

export const CustomTextArea: React.FC<ICustomTextArea> = ({
    name,
    label,
    placeholder = "",
    requirements,
    resize = true,
}) => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();

    const value = watch(name) || "";

    const allRequirementsValid =
        value !== "" && requirements.every((req) => req.validator(value));

    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-grey-shades-subheadlines mb-[3px]"
            >
                {label}
            </label>

            <textarea
                {...register(name)}
                id={name}
                placeholder={placeholder}
                className={`w-full border bg-white rounded-[6px] p-[10px] outline-none ${
                    resize && "resize-none"
                } ${
                    errors[name]
                        ? "border-red"
                        : allRequirementsValid
                        ? "border-green"
                        : "border-[#CED4DA]"
                }`}
            />

            <ul className="mt-2 space-y-1">
                {requirements.map((requirement) => {
                    const isValid = requirement.validator(value);

                    return (
                        <li
                            key={requirement.id}
                            className={`flex items-center text-sm ${
                                value === ""
                                    ? "text-grey-shades-validations"
                                    : isValid
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            <IoCheckmarkSharp
                                className={`size-4 ${
                                    value === ""
                                        ? "text-grey-shades-validations"
                                        : isValid
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            />
                            <span
                                className={`font-light text-[10px] ${
                                    value === ""
                                        ? "text-grey-shades-validations"
                                        : isValid
                                        ? "text-green-600"
                                        : "text-red-600"
                                } `}
                            >
                                {requirement.label}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
