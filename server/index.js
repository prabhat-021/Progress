const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/db.js");
// const path = require("path");

dotenv.config();
connectDb();
const PORT = process.env.PORT;
app.use(express.json());

// __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "/frontend/build")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//     })
// } else {
    
//     app.get("/", (req, res) => {
//         res.send("API is running...");
//     });
// }

app.listen(PORT, console.log(`Server is listening at Port:-${PORT}`));