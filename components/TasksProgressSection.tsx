import { getStatuses } from "@/services/data/statuses";
import React from "react";
import ToStartTasksContainer from "./tasks-progress-containers/ToStartTasksContainer";
import InProgressTasksContainer from "./tasks-progress-containers/InProgressTasksContainer";
import ReadyForTestTasksContaineer from "./tasks-progress-containers/ReadyForTestTasksContaineer";
import DoneTasksContainer from "./tasks-progress-containers/DoneTasksContainer";
import { getTasks } from "@/services/data/tasks";

const TasksProgressSection = async () => {
    const [statuses, tasks] = await Promise.all([getStatuses(), getTasks()]);

    const toStartTasks = tasks.filter(
        (task) => task.status.id === statuses[0].id
    );

    const inProgressTasks = tasks.filter(
        (task) => task.status.id === statuses[1].id
    );

    const readyFroTestTasks = tasks.filter(
        (task) => task.status.id === statuses[2].id
    );

    const DoneTasks = tasks.filter((task) => task.status.id === statuses[3].id);

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
                    tasks={readyFroTestTasks}
                    borderColor="#FF006E"
                />
                <DoneTasksContainer
                    status={statuses[3]}
                    tasks={DoneTasks}
                    borderColor="#3A86FF"
                />
            </div>
        </section>
    );
};

export default TasksProgressSection;
