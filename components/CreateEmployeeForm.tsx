import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ACCEPTED_IMAGE_TYPES,
    createEmployeeFormSchema,
    CreateEmployeeFormSchemaType,
    MAX_FILE_SIZE,
} from "@/schemas/createEmployeeFormSchema";
import { CustomInput } from "./CustomInput";
import { CustomSelectOption } from "./CustomSelectOption";
import CustomFileUpload from "./CustomFileUpload";

const CreateEmployeeForm: React.FC = () => {
    const methods = useForm<CreateEmployeeFormSchemaType>({
        resolver: zodResolver(createEmployeeFormSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            departmentId: "",
            avatar: undefined,
        },
    });

    const onSubmit = (data: any) => {
        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("departmentId", data.departmentId);

        if (data.avatar && data.avatar.length > 0) {
            formData.append("avatar", data.avatar[0]);
        } else {
            console.error("No avatar file detected in form data.");
        }

        console.log("Final FormData entries:");
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                encType="multipart/form-data"
                className="rounded-[10px] px-[50px] pt-10 pb-[60px]"
            >
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <CustomInput
                            name="firstName"
                            label="სახელი *"
                            requirements={[
                                {
                                    id: "min-length",
                                    label: "მინიმუმ 2 სიმბოლო",
                                    validator: (value) => value.length >= 2,
                                },
                                {
                                    id: "max-length",
                                    label: "მაქსიუმუმ 255 სიმბოლო",
                                    validator: (value) => value.length <= 255,
                                },
                                {
                                    id: "firstName-chars",
                                    label: "მხოლოდ ქართული ან ლათინური სიმბოლოები",
                                    validator: (value) =>
                                        /^[a-zA-Zა-ჰ\s]*$/.test(value),
                                },
                            ]}
                        />
                    </div>

                    <div className="col-span-6">
                        <CustomInput
                            name="lastName"
                            label="გვარი *"
                            requirements={[
                                {
                                    id: "min-length",
                                    label: "მინიმუმ 2 სიმბოლო",
                                    validator: (value) => value.length >= 2,
                                },
                                {
                                    id: "max-length",
                                    label: "მაქსიმუმ 255 სიმბოლო",
                                    validator: (value) => value.length <= 255,
                                },
                                {
                                    id: "lastName-chars",
                                    label: "მხოლოდ ქართული ან ლათინური სიმბოლოები",
                                    validator: (value) =>
                                        /^[a-zA-Zა-ჰ\s]*$/.test(value),
                                },
                            ]}
                        />
                    </div>
                    <div className="col-span-12">
                        <CustomFileUpload
                            name="avatar"
                            label="ავატარი *"
                            requirements={[
                                {
                                    id: "required",
                                    label: "სურათი სავალდებულოა",
                                    validator: (file) => file !== null,
                                },
                                {
                                    id: "fileType",
                                    label: "უნდა იყოს სურათის ტიპის (JPEG, PNG)",
                                    validator: (file: any) =>
                                        file &&
                                        ACCEPTED_IMAGE_TYPES.includes(
                                            file.type
                                        ),
                                },
                                {
                                    id: "fileSize",
                                    label: "მაქსიმუმ 600kb ზომაში",
                                    validator: (file: any) =>
                                        file && file.size <= MAX_FILE_SIZE,
                                },
                            ]}
                        />
                    </div>
                    <div className="col-span-6">
                        <CustomSelectOption
                            name="departmentId"
                            label="დეპარტამენტი"
                            placeholder=""
                            options={[
                                {
                                    value: "1",
                                    label: "ინფორმაციული ტექნოლოგიები",
                                },
                                { value: "2", label: "ადამიანური რესურსები" },
                                { value: "3", label: "მენეჯერი" },
                            ]}
                            requirements={[
                                {
                                    id: "required",
                                    label: "დეპარტამენტის არჩევა სავალდებულოა",
                                    validator: (value) => value !== "",
                                },
                            ]}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6"
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    );
};

export default CreateEmployeeForm;
