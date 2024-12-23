import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5001;

connectToDatabase().then(() => {

  app.listen(5001, () => console.log("Server Open & Connected to Database 🙂"));

}).catch((err) => console.log(err));
