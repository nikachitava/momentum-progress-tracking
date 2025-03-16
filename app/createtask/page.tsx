import React from "react";
import CreateNewTaskForm from "@/components/CreateNewTaskForm";
import { getDepartments } from "@/services/data/departments";
import { getEmployees } from "@/services/data/employees";
import { getPriorities } from "@/services/data/priorities";
import { getStatuses } from "@/services/data/statuses";

const CreateTaskPage = async () => {
    const [departments, priorities, employees, statuses] = await Promise.all([
        getDepartments(),
        getPriorities(),
        getEmployees(),
        getStatuses(),
    ]);
    return (
        <div>
            <div className="container mt-10 pb-20">
                <h1 className="font-semibold text-[34px] text-grey-shades-headlines">
                    შექმენი ახალი დავალება
                </h1>
                <CreateNewTaskForm
                    departments={departments}
                    employees={employees}
                    priorities={priorities}
                    statuses={statuses}
                />
            </div>
        </div>
    );
};

export default CreateTaskPage;
