import Link from "next/link";
import React from "react";

const NavBar = () => {
    return (
        <header>
            <div className="container flex items-center justify-between py-[31px]">
                <Link href={"/"}>
                    {" "}
                    <img src="/logo.svg" />
                </Link>
                <button>SUBMIT</button>
            </div>
        </header>
    );
};

export default NavBar;
