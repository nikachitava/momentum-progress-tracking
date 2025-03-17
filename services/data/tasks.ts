import { fetchAuthData } from "@/services/api";
import { ITasksReqResponse } from "@/types/ITasksReqResponse";

export async function getTasks(): Promise<ITasksReqResponse[]> {
    return fetchAuthData<ITasksReqResponse[]>("tasks");
}

export async function getSingleTask(id: number): Promise<ITasksReqResponse> {
    return fetchAuthData<ITasksReqResponse>(`tasks/${id}`);
}


