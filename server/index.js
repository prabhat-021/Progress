const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const collegeRoutes = require("./routes/collegeRoutes.js");
const courseRoutes = require("./routes/courseRoutes.js");
const cors = require("cors");
// const path = require("path");

dotenv.config();
connectDb();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/college", collegeRoutes);

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