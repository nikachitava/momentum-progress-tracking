import FilterMenu from "@/components/FilterMenu";
import { getDepartments } from "@/services/data/departments";
import { getEmployees } from "@/services/data/employees";
import { getPriorities } from "@/services/data/priorities";
import React from "react";

const Home = async () => {
    const [departments, priorities, employees] = await Promise.all([
        getDepartments(),
        getPriorities(),
        getEmployees(),
    ]);

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
