import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import notebooks from "./routes/notebook.mjs";
// server.mjs
// Initializes the Express server

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/notebooks", notebooks);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});