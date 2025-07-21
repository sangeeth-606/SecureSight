
import express from "express";

import "dotenv/config";


const app = express();


// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
//     credentials: true,
//   }),
// );

app.use(express.json());
app.listen(3002, () => {
  console.log("Server running at http://localhost:3002");
});