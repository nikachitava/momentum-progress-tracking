"use client";

import {
    createTaskFormSchema,
    CreateTaskFormSchemaType,
} from "@/schemas/creatTaskFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
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

const FORM_STORAGE_KEY = "create_task_form_data";

const CreateNewTaskForm: React.FC<ICreateNewTaskForm> = ({
    departments,
    employees,
    priorities,
    statuses,
}) => {
    const router = useRouter();

    const getSavedFormData = (): Partial<CreateTaskFormSchemaType> => {
        if (typeof window === "undefined") return {};

        try {
            const savedData = localStorage.getItem(FORM_STORAGE_KEY);
            return savedData ? JSON.parse(savedData) : {};
        } catch (error) {
            console.error("Error loading saved form data:", error);
            return {};
        }
    };

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
            ...getSavedFormData(),
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
        watch,
        reset,
    } = methods;

    const formValues = watch();

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formValues));
        }
    }, [formValues]);

    const onSubmit = async (data: CreateTaskFormSchemaType) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description || "");
        formData.append("department_id", data.department_id);
        formData.append("due_date", data.due_date);
        formData.append("employee_id", data.employee_id);
        formData.append("priority_id", data.priority_id);
        formData.append("status_id", data.status_id);

        try {
            const response = await createNewTask(formData);
            console.log("created task: ", response);

            if (response && response.success) {
                localStorage.removeItem(FORM_STORAGE_KEY);

                reset();

                router.push(`/task/${response.id}`);
            }
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
