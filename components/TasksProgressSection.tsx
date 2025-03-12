import { getStatuses } from "@/services/data/statuses";
import React from "react";
import ToStartTasksContainer from "./tasks-progress-containers/ToStartTasksContainer";
import InProgressTasksContainer from "./tasks-progress-containers/InProgressTasksContainer";
import ReadyForTestTasksContaineer from "./tasks-progress-containers/ReadyForTestTasksContaineer";
import DoneTasksContainer from "./tasks-progress-containers/DoneTasksContainer";

const TasksProgressSection = async () => {
    const [statuses] = await Promise.all([getStatuses()]);

    return (
        <section className="mt-[79px]">
            <div className="container grid grid-cols-4 gap-[52px]">
                <ToStartTasksContainer status={statuses[0]} />
                <InProgressTasksContainer status={statuses[1]} />
                <ReadyForTestTasksContaineer status={statuses[2]} />
                <DoneTasksContainer status={statuses[3]} />
            </div>
        </section>
    );
};

export default TasksProgressSection;
