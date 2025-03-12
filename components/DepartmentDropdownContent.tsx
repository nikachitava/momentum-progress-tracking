import { IDepartmentReqResponse } from "@/types/IDepartmentReqResponse";
import React from "react";

const DepartmentDropdownContent = ({
    departments,
}: {
    departments: IDepartmentReqResponse[];
}) => {
    return (
        <div className="absolute left-0 right-0 top-full z-20 mt-[11px] w-[688px] border-[0.5px] border-[#8338EC] rounded-[10px] px-[30px] py-10">
            {departments.map((dep) => (
                <div key={dep.id}>
                    <p>{dep.name}</p>
                </div>
            ))}
        </div>
    );
};

export default DepartmentDropdownContent;
