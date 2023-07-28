const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/connection");
const userRouter = require("./routes/userRouter");
const expenseRouter = require("./routes/expenseRouter");

dotenv.config();
const app = express(); //Main
connectDB();
app.use(express.json()); //To accept json data
app.use(cors());

app.use("/user", userRouter);
app.use("/expense", expenseRouter);

app.get("/",(req,res)=>{
    res.send("API is running")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
