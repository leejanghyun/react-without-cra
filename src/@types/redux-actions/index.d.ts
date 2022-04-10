interface IAction {
  type: string;
}

interface TestActionPayload {
  id: string;
  name: string;
}

interface TestAction extends IAction {
  payload: TestActionPayload;
}
