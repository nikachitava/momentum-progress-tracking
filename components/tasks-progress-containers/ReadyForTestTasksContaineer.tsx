import { ITasksProgressContainer } from "@/types/ITasksProgressContainer";
import React from "react";
import TaskCard from "../TaskCard";
import Link from "next/link";

const ReadyForTestTasksContaineer: React.FC<ITasksProgressContainer> = ({
    status,
    tasks,
    borderColor,
}) => {
    const { id, name } = status;
    return (
        <div className="max-w-[381px]">
            <div className="bg-pink rounded-[10px] py-[15px] cursor-pointer">
                <h1 className="text-white text-center">{name}</h1>
            </div>
            <div className="flex flex-col gap-[30px] mt-[30px]">
                {tasks.map((task) => (
                    <Link href={`/task/${task.id}`} key={task.id}>
                        <TaskCard
                            avatar={task.employee.avatar}
                            department={task.department}
                            description={task.description}
                            due_date={task.due_date}
                            name={task.name}
                            priority={task.priority}
                            total_comments={task.total_comments}
                            borderColor={borderColor}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ReadyForTestTasksContaineer;
