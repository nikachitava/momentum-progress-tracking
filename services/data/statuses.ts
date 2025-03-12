import { fetchData } from "@/services/api";
import { IStatusesReqResponse } from "@/types/IStatusesReqResponse";

export async function getStatuses(): Promise<IStatusesReqResponse[]> {
    return fetchData<IStatusesReqResponse[]>("statuses");
}
