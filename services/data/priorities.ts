import { fetchData } from "@/services/api";
import { IPrioritiesReqResponse } from "@/types/IPrioritiesReqResponse";

export async function getPriorities(): Promise<IPrioritiesReqResponse[]> {
    return fetchData<IPrioritiesReqResponse[]>("priorities");
}
