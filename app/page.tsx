import FilterMenu from "@/components/FilterMenu";
import { IDepartmentReqResponse } from "@/types/IDepartmentReqResponse";
import { IEmployeesReqResponse } from "@/types/IEmployeesReqResponse";
import { IPrioritiesReqResponse } from "@/types/IPrioritiesReqResponse";
import React from "react";

const Home = async () => {
    const departmentsRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/departments`
    );
    const departments: IDepartmentReqResponse[] = await departmentsRes.json();

    const prioritiesRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/priorities`
    );
    const priorities: IPrioritiesReqResponse[] = await prioritiesRes.json();

    const employeesRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/employees`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
                "Content-Type": "application/json",
            },
        }
    );
    const employees: IEmployeesReqResponse[] = await employeesRes.json();

    return (
        <main>
            <div className="container mt-10">
                <h1 className="font-semibold text-[34px] text-grey-shades-headlines">
                    დავალების გვერდი
                </h1>
                <FilterMenu
                    departments={departments}
                    priorities={priorities}
                    employees={employees}
                />
            </div>
        </main>
    );
};

export default Home;
