"use client";

import React, { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { IoClose } from "react-icons/io5";
import CreateEmployeeForm from "./CreateEmployeeForm";
import { IDepartmentReqResponse } from "@/types/IDepartmentReqResponse";

interface IModal {
    departments: IDepartmentReqResponse[];
}

const Modal: React.FC<IModal> = ({ departments }) => {
    const { isModalOpen, toggleModal } = useContext(ModalContext);

    if (!isModalOpen) return null;

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    };

    return (
        <div
            className={`
			fixed inset-0 flex justify-center items-center transition-colors
			${isModalOpen ? "visible bg-black/20 backdrop-blur-sm z-10" : "invisible"}`}
            onClick={handleClickOutside}
        >
            <div className="w-[913px] bg-white px-[50px] pt-10 pb-[60px]">
                <div className="text-right">
                    <div
                        className="bg-[#DEE2E6] rounded-full inline-block cursor-pointer"
                        onClick={toggleModal}
                    >
                        <IoClose color="white" size={40} />
                    </div>
                </div>

                <div>
                    <h2 className="font-medium text-[32px] text-grey-shades-headlines text-center">
                        თანამშრომლის დამატება
                    </h2>
                    <CreateEmployeeForm departments={departments} />
                </div>
            </div>
        </div>
    );
};

export default Modal;
