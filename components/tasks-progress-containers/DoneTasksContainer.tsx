import { ITasksProgressContainer } from "@/types/ITasksProgressContainer";
import React from "react";
import TaskCard from "../TaskCard";

const DoneTasksContainer: React.FC<ITasksProgressContainer> = ({
    status,
    tasks,
    borderColor,
}) => {
    const { id, name } = status;
    return (
        <div className="max-w-[381px]">
            <div className="bg-blue rounded-[10px] py-[15px] cursor-pointer">
                <h1 className="text-white text-center">{name}</h1>
            </div>
            <div className="space-y-[30px] mt-[30px]">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        avatar={task.employee.avatar}
                        department={task.department.name}
                        description={task.description}
                        due_date={task.due_date}
                        name={task.name}
                        priority={task.priority}
                        total_comments={task.total_comments}
                        borderColor={borderColor}
                    />
                ))}
            </div>
        </div>
    );
};

export default DoneTasksContainer;
