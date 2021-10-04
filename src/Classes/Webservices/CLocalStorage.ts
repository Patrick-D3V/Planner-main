import { IWebservice, ITasksContainer, eSaveType } from "../../Interfaces";
import CTaskList from "../Lists/CDefaultTaskList";
import CTask from "../Tasks/CDefaultTask";

export default class CLocalStorage implements IWebservice {

    private _saveType: eSaveType;

    constructor(p_SaveType: eSaveType) {

        this._saveType = p_SaveType;
    }

    public get saveType(): eSaveType {

        return this._saveType;
    }

    fGetLists(p_nUserID?: string): any {

        let oReturn: any = [];
        var oData: any = window.localStorage?.getItem("planner");
        try {
            oData = JSON.parse(oData);
            oData.forEach((ContainerElem: any) => {

                var arrChildren: any = [];
                ContainerElem._children.forEach((ChildElem: any) => {

                    arrChildren.push(new CTask(ChildElem._id, ChildElem._parentid, ChildElem._type, ChildElem._props, ChildElem._data));
                });
                oReturn.push(new CTaskList(ContainerElem._id, ContainerElem._type, ContainerElem._name, ContainerElem._props, arrChildren));
            });
        }
        finally {

            if (oReturn.length === 0) {

                oReturn = [
                    new CTaskList("0", "Container", "Purpose", { orientation: "vertical", className: "card-container" }, this.fGetTasks("0")),
                    new CTaskList("1", "Container", "Backlog", { orientation: "vertical", className: "card-container" }, this.fGetTasks("1")),
                    new CTaskList("2", "Container", "Sprint", { orientation: "vertical", className: "card-container" }, this.fGetTasks("2")),
                    new CTaskList("3", "Container", "Active", { orientation: "vertical", className: "card-container" }, this.fGetTasks("3")),
                    new CTaskList("4", "Container", "Done", { orientation: "vertical", className: "card-container" }, this.fGetTasks("4")),
                ];
            }
            return oReturn;
        }
    };
    fGetTasks(p_nListID: string): any {

    };
    fSave(p_oData: any): any {

        window.localStorage?.setItem("planner", JSON.stringify(p_oData));
    }
}