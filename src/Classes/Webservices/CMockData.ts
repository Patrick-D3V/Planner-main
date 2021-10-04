import { eSaveType, ITasksContainer, IWebservice } from "../../Interfaces";
import CTaskList from "../Lists/CDefaultTaskList";
import CTask from "../Tasks/CDefaultTask";

export default class CMockData implements IWebservice {

    private _saveType: eSaveType;

    constructor(p_SaveType: eSaveType) {

        this._saveType = p_SaveType;
    }

    public get saveType(): eSaveType {

        return this._saveType;
    }

    public fGetLists(p_nUserID: string): Array<ITasksContainer> {

        let oReturn: Array<ITasksContainer> = [
            new CTaskList("0", "Container", "Purpose", { orientation: "vertical", className: "card-container" }, this.fGetTasks("0")),
            new CTaskList("1", "Container", "Backlog", { orientation: "vertical", className: "card-container" }, this.fGetTasks("1")),
            new CTaskList("2", "Container", "Sprint", { orientation: "vertical", className: "card-container" }, this.fGetTasks("2")),
            new CTaskList("3", "Container", "Active", { orientation: "vertical", className: "card-container" }, this.fGetTasks("3")),
            new CTaskList("4", "Container", "Done", { orientation: "vertical", className: "card-container" }, this.fGetTasks("4")),
        ];

        // window.localStorage.setItem("planner", JSON.stringify(oReturn));
        return oReturn;
    }

    public fGetTasks(p_nListID: string): any {

        let arrReturn = [];

        for (let index = 0; index < Math.ceil(Math.random() * 10); index++) {

            arrReturn.push(new CTask((Math.random() + 1).toString(36).substring(7), p_nListID, "draggable", { className: "card", style: { background: "white" } }, "Ohne Titel"))
        }
        return arrReturn;
    }

    fSave(p_oData: any): any {

    }
}