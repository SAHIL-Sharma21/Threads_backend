import express from 'express'
import { ApolloServer } from '@apollo/server';

const app = express();
const PORT =  process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({message: "Server is up and running..."})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});