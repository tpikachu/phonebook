import { useMutation } from "react-query";
import { gql } from "@apollo/client";

import graphQLClient from "../../../api/graphQLClient";

const useMutationDeleteContact = () => {
  return useMutation("deleteContact", async (id: number) => {
    const { data } = await graphQLClient.mutate({
      mutation: gql`
        mutation deleteContact($id: Int!) {
          deleteContact(id: $id) {
            message
          }
        }
      `,
      variables: {
        id,
      },
    });
    return data.message;
  });
};

export default useMutationDeleteContact;
