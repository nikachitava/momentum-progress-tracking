"use server";

import { revalidatePath } from "next/cache";

export const createNewTask = async (formData: FormData) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tasks`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        revalidatePath("/");
        return { success: true, id: data.id };
    } catch (error) {
        console.error("Error:", error);
    }
};