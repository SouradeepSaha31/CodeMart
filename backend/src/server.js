import databaseConnection from "./db/dbConnection.js"
import {app} from "./app.js"
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})




databaseConnection()
.then(() => {
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`App is listening at port : http://localhost:${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("mongodb connection failed on Server.js : ", error)
})
