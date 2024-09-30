import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prisma } from "./db/db";

//init functio for graphqlserver
async function init() {
  const app = express();
  const PORT = process.env.PORT || 8080;
  app.use(express.json());

  //creating graphqlserver
  const glServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String,
            say(name: String): String
        }

        type Mutation {
          createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
        }

    `,//schema
    resolvers: {
        Query:{
            hello: () => `Hey There i am graphql server`,
            say:(_,{name}:{name:string}) => `Hey, ${name} how are you?` 
        },
        Mutation: {
          createUser: async(_, {
            firstName, 
            lastName, 
            email, 
            password
          }:{
            firstName: string; 
            lastName: string; 
            email: string; 
            password: string;
          }) => {
            await prisma.user.create({
              data: {
                firstName,
                lastName,
                email,
                password,
                salt: "random_salt"
              }
            });
            return true;
          }
        }
    },//actual logic and function
  });

  await glServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running..." });

  });

  app.use("/graphql", expressMiddleware(glServer));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

init();
