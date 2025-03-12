import { fetchAuthData } from "@/services/api";
import { IEmployeesReqResponse } from "@/types/IEmployeesReqResponse";

export async function getEmployees(): Promise<IEmployeesReqResponse[]> {
    return fetchAuthData<IEmployeesReqResponse[]>("employees");
}
