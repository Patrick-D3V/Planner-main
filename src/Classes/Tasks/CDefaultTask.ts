import { ITasks } from "../../Interfaces";

interface ITaskProps{
    className: string,
    style: string
}

export default class CTask implements ITasks {
    
    constructor(p_sType: string, p_nId: string, p_oProps:ITaskProps, p_sData:string) {
        
        this._type = p_sType;
        this._id = p_nId;
        this._props = p_oProps;
        this._data = p_sData;
    }

    private _type: string;
    private _id: string;
    private _props: {
        className: string,
        style: string
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
     * Getter data
     * @return {string}
     */
	public get data(): string {
		return this._data;
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

}