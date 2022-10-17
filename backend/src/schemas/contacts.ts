import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../services/contacts";

export interface IContact {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export const contactsTypeDefs = `#graphql
  input InputContact {
    firstName: String!
    lastName: String!
    phoneNumber: String!
  }

  type Contact {
    id: Int
    firstName: String!
    lastName: String!
    phoneNumber: String!
  }

  type Query {
    contacts(query: String): [Contact]
  }

  type ResponseMsg {
    message: String
  }

  type Mutation {
    deleteContact(id: Int!): ResponseMsg
    updateContact(id: Int!, newContact: InputContact!): ResponseMsg
    createContact(newContact: InputContact!): ResponseMsg
  }
`;

export const contactsResolver = {
  Query: {
    contacts: async (_, { query }, __) => {
      return await getContacts(query);
    },
  },
  Mutation: {
    deleteContact: async (_, { id }, __) => {
      const message = await deleteContact(id);
      return { message };
    },
    updateContact: async (_, { id, newContact }, __) => {
      const message = await updateContact(id, newContact);
      return { message };
    },
    createContact: async (_, { newContact }, __) => {
      const message = await createContact(newContact);
      return { message };
    },
  },
};

export default { contactsTypeDefs, contactsResolver };
