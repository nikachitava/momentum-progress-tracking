"use client";

import React, { useContext, useMemo } from "react";
import ToStartTasksContainer from "./tasks-progress-containers/ToStartTasksContainer";
import InProgressTasksContainer from "./tasks-progress-containers/InProgressTasksContainer";
import ReadyForTestTasksContaineer from "./tasks-progress-containers/ReadyForTestTasksContaineer";
import DoneTasksContainer from "./tasks-progress-containers/DoneTasksContainer";
import { IStatusesReqResponse } from "@/types/IStatusesReqResponse";
import { ITasksReqResponse } from "@/types/ITasksReqResponse";
import { FilterMenuContext } from "@/context/FilterMenuContext";
import { IDepartmentReqResponse } from "@/types/IDepartmentReqResponse";
import { IEmployeesReqResponse } from "@/types/IEmployeesReqResponse";
import { IPrioritiesReqResponse } from "@/types/IPrioritiesReqResponse";

interface ITasksProgressSection {
    statuses: IStatusesReqResponse[];
    tasks: ITasksReqResponse[];
}

const TasksProgressSection: React.FC<ITasksProgressSection> = ({
    statuses,
    tasks,
}) => {
    // const toStartTasks = tasks.filter(
    //     (task) => task.status.id === statuses[0].id
    // );

    // const inProgressTasks = tasks.filter(
    //     (task) => task.status.id === statuses[1].id
    // );

    // const readyFroTestTasks = tasks.filter(
    //     (task) => task.status.id === statuses[2].id
    // );

    // const DoneTasks = tasks.filter((task) => task.status.id === statuses[3].id);

    const { selectedDepartments, selectedEmployees, selectedPriorities } =
        useContext(FilterMenuContext);

    const filterTasks = useMemo(() => {
        return (task: ITasksReqResponse) => {
            // If no filters are selected in a category dont filter
            const departmentFilter =
                selectedDepartments.length === 0 ||
                (task.department &&
                    selectedDepartments.some(
                        (dep: IDepartmentReqResponse) =>
                            dep.id === task.department.id
                    ));

            const employeeFilter =
                selectedEmployees.length === 0 ||
                (task.employee &&
                    selectedEmployees.some(
                        (emp: IEmployeesReqResponse) =>
                            emp.id === task.employee.id
                    ));

            const priorityFilter =
                selectedPriorities.length === 0 ||
                (task.priority &&
                    selectedPriorities.some(
                        (prio: IPrioritiesReqResponse) =>
                            prio.id === task.priority.id
                    ));

            // Task passes filter if it matches all selected criteria
            return departmentFilter && employeeFilter && priorityFilter;
        };
    }, [selectedDepartments, selectedEmployees, selectedPriorities]);

    const toStartTasks = useMemo(() => {
        return tasks
            .filter((task) => task.status.id === statuses[0].id)
            .filter(filterTasks);
    }, [tasks, statuses, filterTasks]);

    const inProgressTasks = useMemo(() => {
        return tasks
            .filter((task) => task.status.id === statuses[1].id)
            .filter(filterTasks);
    }, [tasks, statuses, filterTasks]);

    const readyForTestTasks = useMemo(() => {
        return tasks
            .filter((task) => task.status.id === statuses[2].id)
            .filter(filterTasks);
    }, [tasks, statuses, filterTasks]);

    const doneTasks = useMemo(() => {
        return tasks
            .filter((task) => task.status.id === statuses[3].id)
            .filter(filterTasks);
    }, [tasks, statuses, filterTasks]);

    return (
        <section className="mt-[79px]">
            <div className="container grid grid-cols-4 gap-[52px]">
                <ToStartTasksContainer
                    status={statuses[0]}
                    tasks={toStartTasks}
                    borderColor="#F7BC30"
                />
                <InProgressTasksContainer
                    status={statuses[1]}
                    tasks={inProgressTasks}
                    borderColor="#FB5607"
                />
                <ReadyForTestTasksContaineer
                    status={statuses[2]}
                    tasks={readyForTestTasks}
                    borderColor="#FF006E"
                />
                <DoneTasksContainer
                    status={statuses[3]}
                    tasks={doneTasks}
                    borderColor="#3A86FF"
                />
            </div>
        </section>
    );
};

export default TasksProgressSection;
