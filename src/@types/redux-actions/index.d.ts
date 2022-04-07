type ToDo = {
  id: number;
  content: string;
  checked: boolean;
};

type ToDoList = ToDo[] | [];

interface IToDoListState {
  toDoList: IToDoList;
}

interface IAction {
  type?: string;
}

interface IToggleToDoPayload {
  id: number;
  checked: boolean;
}

interface IToggleToDoAction extends IAction {
  payload: IToggleToDoPayload;
}

interface IDeleteToDoPayload {
  id: number;
}

interface IDeleteToDoAction extends IAction {
  payload: IDeleteToDoPayload;
}
