const express = require('express')
const app = express();

const authRoute = require("./routes/auth");

require('dotenv').config();
app.use(express.json());

app.use("/auth",authRoute);

app.listen((8080),()=>{
    console.log("listening on port 8080");
});