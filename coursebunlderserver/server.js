import app from "./app.js";

app.listen(process.env.PORT,()=>{
    console.log(`server is working on Port: ${process.env.PORT}`)
})