import { ITaskListProps, ITasks } from "../../Interfaces";
import CTask from "../Tasks/CDefaultTask";
export default class CTaskList {

    private _id: string;
    private _type: string;
    private _name: string;
    private _props: ITaskListProps;
    private _children: Array<ITasks>;


    constructor(p_nId: string, p_sType: string, p_sName: string, p_oProps: ITaskListProps, p_dctChildren?: Array<ITasks>) {
        this._id = p_nId;
        this._type = p_sType;
        this._name = p_sName;
        this._props = p_oProps;
        this._children = p_dctChildren ?? [];
    }

    /**
     * Getter id
     * @return {string}
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Getter type
     * @return {string}
     */
    public get type(): string {
        return this._type;
    }

    /**
     * Getter name
     * @return {string}
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Getter props
     * @return {ITaskListProps}
     */
    public get props(): ITaskListProps {
        return this._props;
    }

    /**
     * Getter children
     * @return {Array<ITasks>}
     */
    public get children(): Array<ITasks> {
        return this._children;
    }

    /**
     * Setter id
     * @param {string} value
     */
    public set id(value: string) {
        this._id = value;
    }

    /**
     * Setter type
     * @param {string} value
     */
    public set type(value: string) {
        this._type = value;
    }

    /**
     * Setter name
     * @param {string} value
     */
    public set name(value: string) {
        this._name = value;
    }

    /**
     * Setter props
     * @param {ITaskListProps} value
     */
    public set props(value: ITaskListProps) {
        this._props = value;
    }

    /**
     * Setter children
     * @param {Array<ITasks>} value
     */
    public set children(value: Array<ITasks>) {
        this._children = value;
    }

    public fAddTask(p_oTask?: ITasks) {

        if (p_oTask) {

            p_oTask.parentId = this.id;
            this.children.push(p_oTask);
        } else {

            this.children.push(new CTask((Math.random() + 1).toString(36).substring(7), this.id, "draggable", { className: "card", style: { background: "white" } }, "Ohne Titel"));
        }
    }

    public fRemoveTask(p_oTask: ITasks) {

        this.children = this.children.filter(function (pElement) {
            return pElement !== p_oTask;
        });
    }
}