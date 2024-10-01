import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createGraphQlServer from "./graphql";

//init functio for graphqlserver
async function init() {
  const app = express();
  const PORT = process.env.PORT || 8080;
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running..." });

  });

  app.use("/graphql", expressMiddleware(await createGraphQlServer()));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

init();
