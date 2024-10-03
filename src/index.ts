import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createGraphQlServer from "./graphql";
import UserService from "./services/userServices";

//init functio for graphqlserver
async function init() {
  const app = express();
  const PORT = process.env.PORT || 8080;
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running..." });

  });

  app.use("/graphql", expressMiddleware(await createGraphQlServer(), {
    context : async({req}) => {
      const userToken = req.headers?.authorization!;
      try {
        const user = UserService.decodeJwtToken(userToken);
        return {user}
      } catch (error) {
          return {};
      }
    }
  }));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

init();
