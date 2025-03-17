import { fetchAuthData } from "@/services/api";
import { IComment } from "@/types/ICommentsReqResponse";


export async function getComments(id: number): Promise<IComment[]> {
    return fetchAuthData<IComment[]>(`tasks/${id}/comments`);
}


