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
            className="bg-white border rounded-[15px] p-4 sm:p-5 h-auto sm:h-[217px] flex flex-col justify-between"
            style={{ borderColor: borderColor, borderWidth: "1px" }}
        >
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-[10px]">
                    <div
                        className={clsx(
                            "flex items-center gap-1 p-1 rounded-[5px] border-[0.5px]",
                            priorityColors[priority.id]
                        )}
                    >
                        <img
                            src={priority.icon}
                            alt="priority_icon"
                            className="w-4 h-4"
                        />
                        <span className="font-medium text-xs text-pink-500">
                            {priority.name}
                        </span>
                    </div>
                    <div
                        className={clsx(
                            "rounded-[15px] py-[3px] px-[7px] sm:py-[5px] sm:px-[9px]",
                            departmentColors[department.id]
                        )}
                    >
                        <p className="text-white text-xs sm:text-sm font-light">
                            {department.name.split(" ")[0]}
                        </p>
                    </div>
                </div>
                <p className="text-grey-shades-headlines text-xs font-normal whitespace-nowrap">
                    {formatDate(due_date)}
                </p>
            </div>

            <div className="px-[2px] my-4 flex-1">
                <h5 className="font-medium text-sm sm:text-base text-grey-shades-headlines break-words line-clamp-1">
                    {name}
                </h5>
                <p className="text-xs sm:text-sm text-grey-shades-subheadlines mt-1 break-words line-clamp-2">
                    {description}
                </p>
            </div>

            <div className="flex items-center justify-between mt-auto">
                <img
                    src={avatar}
                    alt="user_avatar"
                    className="w-8 h-8 sm:size-[31px] rounded-full bg-center object-cover"
                />
                <div className="flex items-center gap-[4px] text-sm text-gray-600">
                    <img
                        src={"/comment.svg"}
                        alt="comment_icon"
                        className="w-4 h-4"
                    />
                    <span className="text-xs sm:text-sm">{total_comments}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
