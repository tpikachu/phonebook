import React, { createContext, PropsWithChildren, useReducer } from "react";
import { IAction, IContact } from "../types";

interface IPhoneBookState {
  loading: boolean;
  error: string;
  selectedContact: IContact | undefined;
  toastMessage: string;
  refetchContactsRequired: boolean; // For refetch the contacts, trigger varirable
}

interface IPhoneBookStateContextInterface {
  state: IPhoneBookState;
  dispatch: (action: IAction) => void;
}

const initialPhonBookState: IPhoneBookState = {
  loading: false,
  toastMessage: "",
  selectedContact: undefined,
  refetchContactsRequired: false,
  error: "",
};

const initialPhoneBookContext = {
  state: initialPhonBookState,
  dispatch: (action: IAction) => undefined,
};

export const reducer = (
  state: IPhoneBookState,
  action: IAction
): IPhoneBookState => {
  switch (action.type) {
    case "APP_SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case "SET_SELECTED_CONTACT":
      return {
        ...state,
        selectedContact: action.payload.selectedContact,
      };
    case "SET_REFETCH_CONTACTS_REQUIRED":
      return {
        ...state,
        refetchContactsRequired: action.payload.refetchContactsRequired,
      };
    case "GET_CONTACTS_QUERY_SUCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };
    case "GET_CONTACTS_QUERY_FAILED":
      return {
        ...state,
        loading: false,
        toastMessage: action.payload.error,
        error: action.payload.error,
      };
    case "CREATE_CONTACT_MUTATION_SUCCESS":
      return {
        ...state,
        toastMessage: "New contact is successfully added!",
        refetchContactsRequired: true,
        loading: false,
      };
    case "CREATE_CONTACT_MUTATION_FAILED":
      return {
        ...state,
        toastMessage: "Sorry, we coulnd't fullfill your request",
        error: action.payload.error,
        loading: false,
      };
    case "UPDATE_CONTACT_MUTATION_SUCCESS":
      return {
        ...state,
        toastMessage: "Contact is successfully updated!",
        selectedContact: undefined,
        refetchContactsRequired: true,
        loading: false,
      };
    case "UPDATE_CONTACT_MUTATION_FAILED":
      return {
        ...state,
        toastMessage: "Sorry, we coulnd't fullfill your request",
        selectedContact: undefined,
        error: action.payload.error,
        loading: false,
      };
    case "DELETE_CONTACT_MUTATION_SUCCESS":
      return {
        ...state,
        toastMessage: "Contact is successfully deleted!",
        loading: false,
      };
    case "DELETE_CONTACT_MUTATION_FAILED":
      return {
        ...state,
        toastMessage: "Sorry, we coulnd't fullfill your request",
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
};

export const PhoneBookContext = createContext<IPhoneBookStateContextInterface>(
  initialPhoneBookContext
);

const PhoneBookContextProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialPhonBookState);

  return (
    <PhoneBookContext.Provider value={{ state, dispatch }}>
      {children}
    </PhoneBookContext.Provider>
  );
};
export default PhoneBookContextProvider;
