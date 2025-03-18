"use client";

import { departmentColors, priorityColors } from "@/constants/colors";
import { ITasksReqResponse } from "@/types/ITasksReqResponse";
import { formatDate } from "@/utils/formatDate";
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import { IStatusesReqResponse } from "@/types/IStatusesReqResponse";
import { updateTaskStatus } from "@/actions/updateTaskStatus";

interface ITaskDetailsContainer {
    task: ITasksReqResponse;
    statuses: IStatusesReqResponse[];
}

const TaskDetailsContainer: React.FC<ITaskDetailsContainer> = ({
    task,
    statuses,
}) => {
    const [currentStatus, setCurrentStatus] = useState<number>(task.status.id);

    const handleStatusChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newStatusId = Number(e.target.value);

        if (newStatusId === currentStatus) return; //in case if status wont be changed

        try {
            const result = await updateTaskStatus({
                taskId: task.id,
                statusId: newStatusId,
            });

            setCurrentStatus(newStatusId);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="mt-[50px] max-w-[715px]">
            <div>
                <div className="flex items-center gap-[10px]">
                    <div
                        className={clsx(
                            "flex items-center gap-1 p-1 rounded-[5px] border-[0.5px]",
                            priorityColors[task.priority.id]
                        )}
                    >
                        <img
                            src={task.priority.icon}
                            alt="priority_icon"
                            className="size-4"
                        />
                        <span className="font-medium color-pink text-xs">
                            {task.priority.name}
                        </span>
                    </div>
                    <div
                        className={clsx(
                            "rounded-[15px] py-[5px] px-[9px]",
                            departmentColors[task.department.id]
                        )}
                    >
                        <p className="text-white text-sm font-light">
                            {task.department.name.split(" ")[0]}
                        </p>
                    </div>
                </div>
            </div>
            <h1 className="font-semibold text-[34px] text-grey-shades-headlines">
                {task.name}
            </h1>
            <p className="mt-[26px] text-black text-[18px]">
                {task.description}
            </p>

            <div className="max-w-[493px] mt-[73px]">
                <h1 className="text-[#2A2A2A] text-2xl font-medium mb-[18px]">
                    დავალების დეტალები
                </h1>
                <div className="flex items-center justify-between py-[10px]">
                    <div className="flex items-center gap-[6px]">
                        <Image
                            src={"/status-icon.svg"}
                            alt="status-icon"
                            width={24}
                            height={24}
                        />
                        <p className="text-[#474747]">სტატუსი</p>
                    </div>
                    <div>
                        <select
                            name="statuses"
                            className="text-grey-shades-blackish p-2 outline-0"
                            onChange={handleStatusChange}
                            defaultValue={task.status.id}
                        >
                            {statuses.map((status) => (
                                <option
                                    className="text-grey-shades-subheadlines p-2"
                                    key={status.id}
                                    value={status.id}
                                >
                                    {status.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center justify-between py-[10px]">
                    <div className="flex items-center gap-[6px]">
                        <Image
                            src={"/employee-icon.svg"}
                            alt="employee-icon"
                            width={24}
                            height={24}
                        />
                        <p className="text-[#474747]">თანამშრომელი</p>
                    </div>
                    <div>
                        <div className="flex items-end gap-3">
                            <div>
                                <Image
                                    src={task.employee.avatar}
                                    alt={`${task.employee.name}${task.employee.surname} avatar`}
                                    width={24}
                                    height={24}
                                    className="rounded-full size-6 bg-center object-cover"
                                />
                            </div>
                            <div>
                                <span className="text-[11px] font-light text-[#474747]">
                                    {
                                        task.employee.department.name.split(
                                            " "
                                        )[0]
                                    }
                                </span>
                                <p className="text-sm text-grey-shades-blackish">
                                    {task.employee.name +
                                        " " +
                                        task.employee.surname}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between py-[10px]">
                    <div className="flex items-center gap-[6px]">
                        <Image
                            src={"/calendar-icon.svg"}
                            alt="calendar-icon"
                            width={24}
                            height={24}
                        />
                        <p className="text-[#474747]">დავალების ვადა</p>
                    </div>
                    {/* <div>
                        <p>{formatDate(task.due_date)}</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsContainer;
