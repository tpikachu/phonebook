export interface IContact {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface IAction {
  payload: any;
  type: string;
}
