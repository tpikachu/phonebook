import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { contactsTypeDefs, contactsResolver } from "./schemas/contacts";

const server = new ApolloServer({
  typeDefs: contactsTypeDefs,
  resolvers: contactsResolver,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
