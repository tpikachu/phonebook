import { useMutation } from "react-query";
import { gql } from "@apollo/client";

import graphQLClient from "../../../api/graphQLClient";
import { IContact } from "../../../types";

const useMutationAddContact = () => {
  return useMutation("addContact", async (contact: IContact) => {
    const { data } = await graphQLClient.mutate({
      mutation: gql`
        mutation createContact($newContact: InputContact!) {
          createContact(newContact: $newContact) {
            message
          }
        }
      `,
      variables: {
        newContact: contact,
      },
    });
    return data.message;
  });
};

export default useMutationAddContact;
