const dotenv = require("dotenv/config")
const express = require("express");
const cors = require("cors");
const {connectDatabase} = require("./models");
const routes = require('./routes');

const app = express();
connectDatabase();

app.use(cors());
app.use(express.json());
app.get("/",(req, res)=>{
    res.send("OK")
});
app.use('/api/v1', routes);
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})

module.export = app