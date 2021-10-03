import { CSSProperties } from "react";
import { ITasks } from "../../Interfaces";

interface ITaskProps {
    className: string,
    style: CSSProperties
}

export default class CTask implements ITasks {

    constructor(p_nId: string, p_nParentId: string, p_sType: string, p_oProps: ITaskProps, p_sData: string) {

        this._type = p_sType;
        this._id = p_nId;
        this._props = p_oProps;
        this._data = p_sData;
        this._parentId = p_nParentId;
    }

    private _type: string;
    private _parentId: string;
    private _id: string;
    private _props: {
        className: string,
        style: CSSProperties
    };
    private _data: string;


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
     * Getter children
     * @return {string}
     */
    public get parentId(): string {
        return this._parentId;
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

    public set parentId(value: string) {
        this._parentId = value;
    }
}