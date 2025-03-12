import React from "react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
    return (
        <header>
            <div className="container flex items-center justify-between py-[31px]">
                <Link href={"/"}>
                    <Image alt="logo" src="/logo.svg" width={210} height={38} />
                </Link>
                <button>SUBMIT</button>
            </div>
        </header>
    );
};

export default NavBar;
