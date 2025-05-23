"use server";

import { revalidatePath } from "next/cache";

export const createEmployee = async (formData: FormData) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/employees`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        revalidatePath("/");
    } catch (error) {
        console.error("Error:", error);
    }
};