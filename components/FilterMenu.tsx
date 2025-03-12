"use client";

import React, { useState } from "react";
import FilterMenuItem from "./FilterMenuItem";
import DepartmentDropdownContent from "./DepartmentDropdownContent";
import { IFilterMenu } from "@/types/IFilterMenu";
import PriorityDropdownContent from "./PriorityDropdownContent";
import EmployeesDropdownContent from "./EmployeesDropdownContent";

const FilterMenu: React.FC<IFilterMenu> = ({
    departments,
    employees,
    priorities,
}) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const handleMenuClick = (title: string) => {
        setOpenMenu(openMenu === title ? null : title);
    };

    return (
        <div className="relative max-w-[688px] flex items-center justify-between border border-[#DEE2E6] rounded-[10px] mt-[52px]">
            <FilterMenuItem
                title="დეპარტამენტი"
                isOpen={openMenu === "დეპარტამენტი"}
                onClick={() => handleMenuClick("დეპარტამენტი")}
                children={
                    <DepartmentDropdownContent departments={departments} />
                }
            />
            <FilterMenuItem
                title="პრიორიტეტი"
                isOpen={openMenu === "პრიორიტეტი"}
                onClick={() => handleMenuClick("პრიორიტეტი")}
                children={<PriorityDropdownContent priorities={priorities} />}
            />
            <FilterMenuItem
                title="თანამშრომელი"
                isOpen={openMenu === "თანამშრომელი"}
                onClick={() => handleMenuClick("თანამშრომელი")}
                children={<EmployeesDropdownContent employees={employees} />}
            />
        </div>
    );
};

export default FilterMenu;
