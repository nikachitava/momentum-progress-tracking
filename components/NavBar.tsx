"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { FaPlus } from "react-icons/fa6";
import { ModalContext } from "@/context/ModalContext";

const NavBar = () => {
    const clickButton = () => {
        console.log("clickeed");
    };

    const { toggleModal } = useContext(ModalContext);

    return (
        <header>
            <div className="container flex items-center justify-between py-[31px]">
                <Link href={"/"}>
                    <Image alt="logo" src="/logo.svg" width={210} height={38} />
                </Link>
                <div className="flex items-center gap-10">
                    <CustomButton
                        title="თანამშრომლის შექმნა"
                        onClick={toggleModal}
                        otherStyles="text-grey-shades-headlines border border-[#8338EC]"
                        fill={false}
                    />
                    <CustomButton
                        title="შექმენი ახალი დავალება"
                        onClick={clickButton}
                        icon={<FaPlus />}
                        otherStyles="bg-purple-accent text-white"
                        fill={true}
                    />
                </div>
            </div>
        </header>
    );
};

export default NavBar;
