import app from "./app.js";
import { connectDb } from "./config/database.js";
connectDb()
app.listen(process.env.PORT,()=>{
    console.log(`server is working on Port: ${process.env.PORT}`)
})