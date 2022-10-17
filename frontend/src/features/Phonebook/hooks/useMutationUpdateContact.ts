import { useMutation } from "react-query";
import { gql } from "@apollo/client";

import graphQLClient from "../../../api/graphQLClient";
import { IContact } from "../../../types";

const useMutationUpdateContact = () => {
  return useMutation("updateContact", async (contact: IContact) => {
    const { id, ...rest } = contact;
    const { data } = await graphQLClient.mutate({
      mutation: gql`
        mutation updateContact($id: Int!, $newContact: InputContact!) {
          updateContact(id: $id, newContact: $newContact) {
            message
          }
        }
      `,
      variables: {
        id: contact.id,
        newContact: rest,
      },
    });
    return data.message;
  });
};

export default useMutationUpdateContact;
