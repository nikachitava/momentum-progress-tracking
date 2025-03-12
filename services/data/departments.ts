import { fetchData } from "@/services/api";
import { IDepartmentReqResponse } from "@/types/IDepartmentReqResponse";

export async function getDepartments(): Promise<IDepartmentReqResponse[]> {
    return fetchData<IDepartmentReqResponse[]>("departments");
}
