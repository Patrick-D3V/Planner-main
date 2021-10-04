import { CSSProperties } from "react";

export interface IWebservice {

    fGetLists(p_nUserID?: string): any;
    fGetTasks(p_nListID: string): any;
    fSave(p_oData: any): any;
    saveType: eSaveType;
}

export interface ITasksContainer {
    id: string,
    type: string,
    name: string,
    props: {
        orientation: string,
        className: string
    },
    children?: Array<ITasks>,
    fAddTask: Function,
    fRemoveTask: Function
}

export interface ITasks {
    id: string,
    parentId: string,
    type: string,
    props: {
        className: string,
        style: CSSProperties
    },
    data: string
}
export interface ITaskListProps {
    orientation: string,
    className: string
}

export enum eSaveType {
    Single,
    Complete
}