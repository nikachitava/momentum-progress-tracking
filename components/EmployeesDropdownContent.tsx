import { IEmployeesReqResponse } from "@/types/IEmployeesReqResponse";
import React from "react";

const EmployeesDropdownContent = ({
    employees,
}: {
    employees: IEmployeesReqResponse[];
}) => {
    return (
        <div className="absolute left-0 right-0 top-full z-20 mt-[11px] w-[688px] border-[0.5px] border-[#8338EC] rounded-[10px] px-[30px] py-10">
            {employees.map((employee) => (
                <div key={employee.id}>
                    <p>{employee.name}</p>
                </div>
            ))}
        </div>
    );
};

export default EmployeesDropdownContent;
