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
import { IDepartmentReqResponse } from "@/types/IDepartmentReqResponse";
import CustomButton from "./CustomButton";
import { createEmployee } from "@/actions/createEmployee";

interface ICreateEmployeeForm {
    departments: IDepartmentReqResponse[];
    toggleModal: () => void;
}

const CreateEmployeeForm: React.FC<ICreateEmployeeForm> = ({
    departments,
    toggleModal,
}) => {
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

    const onSubmit = async (data: CreateEmployeeFormSchemaType) => {
        const formData = new FormData();
        formData.append("name", data.firstName);
        formData.append("surname", data.lastName);
        if (data.avatar && data.avatar.length > 0) {
            formData.append("avatar", data.avatar[0]);
        }
        formData.append("department_id", data.departmentId);

        // for (const [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        try {
            await createEmployee(formData);
            toggleModal();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const departmentOptions = departments.map((dept) => ({
        value: dept.id.toString(),
        label: dept.name,
    }));

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
                            options={departmentOptions}
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

                <div className="flex items-center justify-end gap-[22px] mt-[25px]">
                    <CustomButton
                        type="button"
                        onClick={toggleModal}
                        title="გაუქმება"
                        fill={false}
                        otherStyles="border border-[#8338EC] rounded-[5px]"
                    />
                    <CustomButton
                        type="submit"
                        onClick={() => {}}
                        title="დაამატე თანამშრომელი"
                        fill
                        otherStyles="text-[18px] text-white bg-purple-accent"
                    />
                </div>
            </form>
        </FormProvider>
    );
};

export default CreateEmployeeForm;
