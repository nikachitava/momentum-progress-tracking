import { IPrioritiesReqResponse } from "@/types/IPrioritiesReqResponse";
import React from "react";

const PriorityDropdownContent = ({
    priorities,
}: {
    priorities: IPrioritiesReqResponse[];
}) => {
    return (
        <div className="absolute left-0 right-0 top-full z-20 mt-[11px] w-[688px] border-[0.5px] border-[#8338EC] rounded-[10px] px-[30px] py-10">
            {priorities.map((priority) => (
                <div key={priority.id}>
                    <p>{priority.name}</p>
                </div>
            ))}
        </div>
    );
};

export default PriorityDropdownContent;
