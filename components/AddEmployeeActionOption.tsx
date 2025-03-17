import { ModalContext } from "@/context/ModalContext";
import Image from "next/image";
import React, { useContext } from "react";

const AddEmployeeActionOption = () => {
    const { toggleModal } = useContext(ModalContext);
    return (
        <div className="flex items-center gap-2 p-[15px]" onClick={toggleModal}>
            <Image src={"/plus.svg"} alt="plus-icon" width={18} height={18} />
            <p className="text-purple-accent">დაამატე ახალი თანამშრომელი</p>
        </div>
    );
};

export default AddEmployeeActionOption;
