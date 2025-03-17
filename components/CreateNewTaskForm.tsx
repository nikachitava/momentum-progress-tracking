"use client";

import {
    createTaskFormSchema,
    CreateTaskFormSchemaType,
} from "@/schemas/creatTaskFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CustomInput } from "./CustomInput";
import { CustomTextArea } from "./CustomTextArea";
import { CustomSelectOption } from "./CustomSelectOption";
import CustomButton from "./CustomButton";
import { CustomDatePicker } from "./CustomDatePicker";
import { ICreateNewTaskForm } from "@/types/ICreateNewTaskForm";
import { mapToOptions } from "@/utils/mapToOptions";
import { createNewTask } from "@/actions/createNewTask";
import { useRouter } from "next/navigation";
import AddEmployeeActionOption from "./AddEmployeeActionOption";

const CreateNewTaskForm: React.FC<ICreateNewTaskForm> = ({
    departments,
    employees,
    priorities,
    statuses,
}) => {
    const methods = useForm<CreateTaskFormSchemaType>({
        resolver: zodResolver(createTaskFormSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            due_date: "",
            employee_id: "",
            priority_id: "",
            status_id: "",
            department_id: "",
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const router = useRouter();

    const onSubmit = async (data: CreateTaskFormSchemaType) => {
        console.log(data);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description || "");
        formData.append("department_id", data.department_id);
        formData.append("due_date", data.due_date);
        formData.append("employee_id", data.employee_id);
        formData.append("priority_id", data.priority_id);
        formData.append("status_id", data.status_id);

        try {
            await createNewTask(formData);
            router.push("/");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const departmentId = methods.watch("department_id");
    const isDepartmentSelected = !!departmentId;

    const priorityToOption = mapToOptions(priorities, "id", "name", "icon");
    const statusToOption = mapToOptions(statuses, "id", "name");
    const departmentToOption = mapToOptions(departments, "id", "name");

    const filteredEmployee = employees.filter(
        (empl) => empl.department.id == Number(departmentId)
    );

    // console.log("departmentID:", departmentId);
    // console.log("employees:", employees);

    // console.log("filtered employee:", filteredEmployee);

    const employeeToOption = mapToOptions(
        filteredEmployee,
        "id",
        ["name", "surname"],
        "avatar"
    );
    return (
        <div className="bg-[#FBF9FFA6] border-[0.3px] border-[#DDD2FF] rounded mt-[25px]">
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="pt-[65px] pl-[55px] pb-[216px]"
                >
                    <div className="flex items-start gap-40">
                        <div className="w-[550px] space-y-[55px]">
                            <CustomInput
                                name="name"
                                label="სახელი *"
                                requirements={[
                                    {
                                        id: "min-length",
                                        label: "მინიმუმ 3 სიმბოლო",
                                        validator: (value) => value.length >= 3,
                                    },
                                    {
                                        id: "max-length",
                                        label: "მაქსიუმუმ 255 სიმბოლო",
                                        validator: (value) =>
                                            value.length <= 255,
                                    },
                                ]}
                            />
                            <div className="h-40">
                                <CustomTextArea
                                    name="description"
                                    label="აღწერა"
                                    requirements={[
                                        {
                                            id: "min-length",
                                            label: "მინიმუმ 4 სიმბოლო",
                                            validator: (value) =>
                                                value.length >= 4,
                                        },
                                        {
                                            id: "max-length",
                                            label: "მაქსიუმუმ 255 სიმბოლო",
                                            validator: (value) =>
                                                value.length <= 255,
                                        },
                                    ]}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="w-[259px]">
                                    <CustomSelectOption
                                        label="პრიორიტეტი *"
                                        name="priority_id"
                                        options={priorityToOption}
                                        defaultValue={priorityToOption[1].value}
                                        icon
                                    />
                                </div>
                                <div className="w-[259px]">
                                    <CustomSelectOption
                                        label="სტატუსი *"
                                        name="status_id"
                                        options={statusToOption}
                                        defaultValue={statusToOption[0].value}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-[550px] space-y-[55px]">
                            <CustomSelectOption
                                label="დეპარტამენტი *"
                                name="department_id"
                                options={departmentToOption}
                            />
                            <CustomSelectOption
                                label="პასუხისმგებელი თანამშრომელი *"
                                name="employee_id"
                                options={employeeToOption}
                                disabled={!isDepartmentSelected}
                                icon={isDepartmentSelected}
                                actionOption={<AddEmployeeActionOption />}
                            />
                            <div className="w-1/2">
                                <CustomDatePicker
                                    name="due_date"
                                    label="თარიღი *"
                                    requirements={[
                                        {
                                            id: "required",
                                            label: "სავალდებულო",
                                            validator: (value) => !!value,
                                        },
                                        {
                                            id: "no-past-dates",
                                            label: "წარსულ თარიღს ვერ მიუთითებთ",
                                            validator: (value) => {
                                                const selectedDate = new Date(
                                                    value
                                                );
                                                const today = new Date();
                                                today.setDate(
                                                    today.getDate() + 1
                                                );
                                                return selectedDate >= today;
                                            },
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-[145px] pr-[368px]">
                        <CustomButton
                            title="დავალების შექმნა"
                            onClick={() => {}}
                            otherStyles="bg-purple-accent text-white"
                            fill={true}
                            submitting={isSubmitting}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default CreateNewTaskForm;
