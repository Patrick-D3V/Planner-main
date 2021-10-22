import { CSSProperties } from "react";
import { ITaskLabel, ITasks, ITasksContainer } from "../../Interfaces";

interface ITaskProps {
    className: string,
    style: CSSProperties
}

export default class CTask implements ITasks {

    constructor(p_nId: string, p_nParent: ITasksContainer, p_sType: string, p_oProps: ITaskProps, p_sData: string, p_oLabels?: Array<ITaskLabel>) {

        this._type = p_sType;
        this._id = p_nId;
        this._props = p_oProps;
        this._data = p_sData;
        this._parent = p_nParent;
        this._labels = p_oLabels ?? [];
    }

    private _type: string;
    private _parent: ITasksContainer;
    private _id: string;
    private _props: {
        className: string,
        style: CSSProperties
    };
    private _data: string;
    private _labels: Array<ITaskLabel>


    /**
     * Getter type
     * @return {string}
     */
    public get type(): string {
        return this._type;
    }

    /**
     * Getter id
     * @return {string}
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Getter props
     * @return {string}
     */
    public get props(): ITaskProps {
        return this._props;
    }

    /**
     * Getter data
     * @return {string}
     */
    public get data(): string {
        return this._data;
    }

    /**
 * Getter data
 * @return {Array<ITaskLabel>}
 */
    public get labels(): Array<ITaskLabel> {
        return this._labels;
    }

    /**
     * Getter children
     * @return {string}
     */
    public get parent(): ITasksContainer {
        return this._parent;
    }

    /**
     * Setter type
     * @param {string} value
     */
    public set type(value: string) {
        this._type = value;
    }

    /**
     * Setter id
     * @param {string} value
     */
    public set id(value: string) {
        this._id = value;
    }

    /**
     * Setter data
     * @param {string} value
     */
    public set data(value: string) {
        this._data = value;
    }

    /**
     * Setter props
     * @param {string} value
     */
    public set props(value: ITaskProps) {
        this._props = value;
    }

    public set parent(value: ITasksContainer) {
        this._parent = value;
    }

    public set labels(value: Array<ITaskLabel>) {
        this._labels = value;
    }
}