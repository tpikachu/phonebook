import { useQuery } from "react-query";
import { gql } from "@apollo/client";

import graphQLClient from "../../../api/graphQLClient";

const useQueryGetContacts = () => {
  return useQuery("getContacts", async () => {
    const { data } = await graphQLClient.query({
      query: gql`
        query Query {
          contacts {
            id
            firstName
            lastName
            phoneNumber
          }
        }
      `,
    });

    return data.contacts;
  });
};

export default useQueryGetContacts;
