import { ICustomFileUpload } from "@/types/ICustomFileUpload";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const CustomFileUpload: React.FC<ICustomFileUpload> = ({
    name,
    label,
    requirements,
}) => {
    const {
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const [preview, setPreview] = useState<string | null>(null);
    const errorMessage = errors[name]?.message as string | undefined;

    const file = watch(name);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setValue(name, files);
        } else {
            setPreview(null);
            setValue(name, undefined);
        }
    };

    const currentFile = file && file.length > 0 ? file[0] : null;
    const allRequirementsValid =
        currentFile !== null &&
        requirements.every((req) => req.validator(currentFile));

    const handleRemoveImage = () => {
        setPreview(null);
        setValue(name, undefined);
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
                className={`relative w-full h-32 border border-dashed border-[#CED4DA] rounded-[6px] flex items-center justify-center ${
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
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {preview ? (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="size-[88px] object-cover rounded-full"
                        />
                        <img
                            src="/trash-icon.svg"
                            alt="trash-icon"
                            onClick={handleRemoveImage}
                            className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-grey-shades-validations cursor-pointer"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                        <img src="/upload-image.svg" alt="upload-image-icon" />
                        <span className="text-sm text-grey-shades-subheadlines">
                            ატვირთე ფოტო
                        </span>
                    </div>
                )}
            </div>

            {errorMessage && (
                <p className="mt-1 text-sm text-red">{errorMessage}</p>
            )}
        </div>
    );
};

export default CustomFileUpload;
