import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import { config } from "dotenv";

const PORT = process.env.PORT || 2000;

connectToDatabase().then(() => {

  app.listen(2000, () => console.log("Server Open & Connected to Database 🙂"));

}).catch((err) => console.log(err));
