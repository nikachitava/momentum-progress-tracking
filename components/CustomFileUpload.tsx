import { ICustomFileUpload } from "@/types/ICustomFileUpload";
import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";

export const CustomFileUpload: React.FC<ICustomFileUpload> = ({
    name,
    label,
    requirements,
    acceptedFileTypes = "image/*",
}) => {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const [preview, setPreview] = useState<string | null>(null);
    const fileInput = watch(name);

    // Extract single file from FileList
    const file = fileInput instanceof FileList ? fileInput[0] : fileInput;

    const allRequirementsValid =
        file instanceof File &&
        requirements.every((req) => req.validator(file));

    useEffect(() => {
        if (file instanceof File) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }, [file]);

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setValue(name, null, { shouldValidate: true });
        setPreview(null);
    };

    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-grey-shades-subheadlines mb-[3px]"
            >
                {label}
            </label>

            <div
                className={`w-full border bg-white rounded-[6px] cursor-pointer relative ${
                    errors[name]
                        ? "border-red"
                        : allRequirementsValid
                        ? "border-green"
                        : "border-[#CED4DA]"
                }`}
            >
                <input
                    id={name}
                    type="file"
                    accept={acceptedFileTypes}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    {...register(name, {
                        onChange: (e) => {
                            const selectedFile = e.target.files?.[0] || null;
                            setValue(name, selectedFile, {
                                shouldValidate: true,
                            });
                        },
                    })}
                />

                {!preview ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                        <IoCloudUploadOutline className="text-gray-400 w-12 h-12 mb-2" />
                        <p className="text-gray-500">ატვირთეთ სურათი</p>
                        <p className="text-gray-400 text-sm">
                            დააკლიკეთ ან ჩააგდეთ ფაილი
                        </p>
                    </div>
                ) : (
                    <div className="relative p-2 flex justify-center">
                        <img
                            src={preview}
                            alt="File preview"
                            className="h-40 object-contain"
                        />
                        <button
                            onClick={handleDelete}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        >
                            <IoTrashOutline className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">
                    {errors[name]?.message?.toString()}
                </p>
            )}
        </div>
    );
};
