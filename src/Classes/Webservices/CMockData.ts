import { IWebservice } from "../../Interfaces";

export default class CMockData implements IWebservice {

    constructor() {
        
    }

    public fGetLists(p_nUserID:number):Array<string>{

        return [
            "Purpose",
            "Backlog",
            "Sprint",
            "Active",
            "Done"
        ];
    }

    public fGetTasks(p_nListID:number):any{

        return [
            "Test",
            "Test2"
        ];
    }
}