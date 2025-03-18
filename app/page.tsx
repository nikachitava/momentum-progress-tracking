import FilterMenu from "@/components/FilterMenu";
import TasksProgressSection from "@/components/TasksProgressSection";
import { getDepartments } from "@/services/data/departments";
import { getEmployees } from "@/services/data/employees";
import { getPriorities } from "@/services/data/priorities";
import { getStatuses } from "@/services/data/statuses";
import { getTasks } from "@/services/data/tasks";
import React from "react";

const Home = async () => {
    const [departments, priorities, employees, statuses, tasks] =
        await Promise.all([
            getDepartments(),
            getPriorities(),
            getEmployees(),
            getStatuses(),
            getTasks(),
        ]);

    return (
        <main className="pb-20">
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

            <TasksProgressSection statuses={statuses} tasks={tasks} />
        </main>
    );
};

export default Home;
