import { CSSProperties } from "react";

export interface IWebservice {

    fGetLists(p_nUserID?: string): any;
    fGetTasks(p_nListID: any): any;
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
    parent: ITasksContainer,
    type: string,
    props: {
        className: string,
        style: CSSProperties
    },
    data: string,
    labels: Array<ITaskLabel>,
    fDelete: Function
}
export interface ITaskListProps {
    orientation: string,
    className: string
}

export enum eSaveType {
    Single,
    Complete
}

export interface ITaskLabel {
    id: string,
    text: string,
    color: string
}