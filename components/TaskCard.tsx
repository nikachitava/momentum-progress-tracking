import { departmentColors, priorityColors } from "@/constants/colors";
import { ITaskCard } from "@/types/ITaskCard";
import { formatDate } from "@/utils/formatDate";
import clsx from "clsx";
import React from "react";

const TaskCard: React.FC<ITaskCard> = ({
    avatar,
    department,
    description,
    due_date,
    name,
    priority,
    total_comments,
    borderColor,
}) => {
    return (
        <div
            className="h-[217px] bg-white border rounded-[15px] p-5"
            style={{ borderColor: borderColor, borderWidth: "1px" }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                    <div
                        className={clsx(
                            "flex items-center gap-1 p-1 rounded-[5px] border-[0.5px]",
                            priorityColors[priority.id]
                        )}
                    >
                        <img
                            src={priority.icon}
                            alt="priority_icon"
                            className="size-4"
                        />
                        <span className="font-medium color-pink text-xs">
                            {priority.name}
                        </span>
                    </div>
                    <div
                        className={clsx(
                            "rounded-[15px] py-[5px] px-[9px]",
                            departmentColors[department.id]
                        )}
                    >
                        <p className="text-white text-sm font-light">
                            {department.name.split(" ")[0]}
                        </p>
                    </div>
                </div>
                {/* <div>
                    <p className="text-grey-shades-headlines text-xs font-normal">
                        {formatDate(due_date)}
                    </p>
                </div> */}
            </div>
            <div className="px-[10.5] my-[28px]">
                <h5 className="font-medium text-[15px] text-grey-shades-headlines">
                    {name}
                </h5>
                <p className="text-sm text-grey-shades-subheadlines">
                    {description}
                </p>
            </div>
            <div className="flex items-center justify-between">
                <img
                    src={avatar}
                    alt="user_avatar"
                    className="size-[31px] rounded-full bg-center object-cover"
                />
                <div className="flex items-center gap-[2.5px]">
                    <img src={"/comment.svg"} alt="comment_icon" />
                    <span>{total_comments}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
