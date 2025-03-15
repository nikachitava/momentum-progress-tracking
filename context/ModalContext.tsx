"use client";

import { IModalContext } from "@/types/IModalContext";
import { createContext, useState } from "react";

const CONTEXT_DEFAULT_VALUES: IModalContext = {
    isModalOpen: false,
    toggleModal: () => {},
};

export const ModalContext = createContext<IModalContext>(
    CONTEXT_DEFAULT_VALUES
);

export const ModalProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen((isModalOpen) => !isModalOpen);

    return (
        <ModalContext.Provider value={{ isModalOpen, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};
