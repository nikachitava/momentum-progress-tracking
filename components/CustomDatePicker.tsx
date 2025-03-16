import { ICustomDatePicker } from "@/types/ICustomDatePicker";
import React from "react";
import { useFormContext } from "react-hook-form";

export const CustomDatePicker: React.FC<ICustomDatePicker> = ({
    name,
    label,
    requirements,
}) => {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const formatDate = (date: Date) => {
        return date.toISOString().split("T")[0];
    };

    const today = new Date();
    today.setDate(today.getDate() + 1);
    const defaultDate = formatDate(today);

    React.useEffect(() => {
        if (!watch(name)) {
            setValue(name, defaultDate);
        }
    }, [setValue, name, defaultDate, watch]);

    const value: string = watch(name) || defaultDate;

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

            <input
                type="date"
                {...register(name)}
                id={name}
                min={defaultDate}
                className={`w-full border bg-white rounded-[6px] p-[10px] outline-none ${
                    errors[name]
                        ? "border-red"
                        : allRequirementsValid
                        ? "border-green"
                        : "border-[#CED4DA]"
                }`}
                defaultValue={defaultDate}
            />
            {errors[name] && (
                <p className="mt-1 text-xs text-red">
                    {errors[name]?.message?.toString()}
                </p>
            )}
        </div>
    );
};
