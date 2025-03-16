import { IStatusesReqResponse } from "./IStatusesReqResponse";
import { ITasksReqResponse } from "./ITasksReqResponse";

export interface ITasksProgressContainer {
    status: IStatusesReqResponse;
    tasks: ITasksReqResponse[];
    borderColor: string;
}
