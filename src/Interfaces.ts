export interface IWebservice{

    fGetLists(p_nUserID?:number):any;
    fGetTasks(p_nListID:number):any;
}

export interface ITasksContainer {
    id: number,
    type: string,
    name: string,
    props: {
      orientation: string,
      className: string
    },
    children?: ITasks
  }
  
export interface ITasks {
    type: string,
    id: string,
    props: {
        className: string,
        style: string
    },
    data: string
}