"use server"

import { revalidatePath } from "next/cache";

export const createComment = async (taskId: number, comment: string) => {

    try {
        const commentPayLoad = JSON.stringify({text: comment})
        // console.log("TaskID: ", taskId, " Comment: ", comment)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${taskId}/comments`, {
                    method: "POST",
                    body: commentPayLoad,

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
                    },
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
        
                revalidatePath(`/task/${taskId}`);
    } catch (error) {
        console.error("Error:", error);
        throw error; 
    }

}

export const createReply = async (taskId: number, parentId: number | null, comment: string) => {
    try {
        const replayPayLoad = JSON.stringify({text: comment, parent_id: parentId})
        // console.log("TaskID: ", taskId, "parent_id: ", parentId, " Comment: ", comment)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${taskId}/comments`, {
                    method: "POST",
                    body: replayPayLoad,

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
                    },
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
        
                revalidatePath(`/task/${taskId}`);
    } catch (error) {
        console.error("Error:", error);
        throw error; 
    }

}