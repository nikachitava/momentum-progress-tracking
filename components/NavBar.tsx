"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { FaPlus } from "react-icons/fa6";

const NavBar = () => {
    const clickButton = () => {
        console.log("clickeed");
    };

    return (
        <header>
            <div className="container flex items-center justify-between py-[31px]">
                <Link href={"/"}>
                    <Image alt="logo" src="/logo.svg" width={210} height={38} />
                </Link>
                <div className="flex items-center gap-10">
                    <CustomButton
                        title="თანამშრომლის შექმნა"
                        onClick={clickButton}
                        otherStyles="text-grey-shades-headlines border border-[#8338EC]"
                    />
                    <CustomButton
                        title="შექმენი ახალი დავალება"
                        onClick={clickButton}
                        icon={<FaPlus />}
                        otherStyles="bg-purple-accent text-white"
                    />
                </div>
            </div>
        </header>
    );
};

export default NavBar;
