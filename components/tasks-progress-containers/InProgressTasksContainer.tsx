import { ITasksProgressContainer } from "@/types/ITasksProgressContainer";
import React from "react";

const InProgressTasksContainer: React.FC<ITasksProgressContainer> = ({
    status,
}) => {
    const { id, name } = status;
    return (
        <div className="max-w-[381px] bg-orange rounded-[10px] py-[15px] cursor-pointer">
            <div>
                <h1 className="text-white text-center">{name}</h1>
            </div>
        </div>
    );
};

export default InProgressTasksContainer;
