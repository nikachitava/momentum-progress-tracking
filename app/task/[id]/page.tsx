import CommentsSection from "@/components/CommentsSection";
import TaskDetailsContainer from "@/components/TaskDetailsContainer";
import { getComments } from "@/services/data/comments";
import { getStatuses } from "@/services/data/statuses";
import { getSingleTask } from "@/services/data/tasks";
import React from "react";

const SingleTaskPage = async ({
    params,
}: {
    params: Promise<{ id: number }>;
}) => {
    const id = (await params).id;

    const task = await getSingleTask(id);
    const comments = await getComments(id);
    const statuses = await getStatuses();

    return (
        <div className="min-h-screen">
            <div className="container mt-10 pb-20 flex justify-between">
                <TaskDetailsContainer task={task} statuses={statuses} />
                <CommentsSection comments={comments} postId={id} />
            </div>
        </div>
    );
};

export default SingleTaskPage;
