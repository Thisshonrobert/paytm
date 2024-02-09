const PASSWORD = '12345';

const express = require("express");
const rootRouter = require("./routes/index");

const app = express();

app.use(express.json()); 
app.use("/api/v1",rootRouter)

const PORT = 3000;
app.listen(PORT,()=>{
    console.log("listening");
})

module.exports = PASSWORD


