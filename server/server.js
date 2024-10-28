import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import connectDB from "./db/connection.js";
import socketHandlers from "./src/utils/socketHandlers.js";
import initApp from "./src/app.routes.js";

dotenv.config();
const app = express();
const port = +process.env.PORT ;    

let server= app.listen(port, () => {
    console.log("Server started on port 5000");
});

const io =new Server(server,{
    cors:{
        origin:"*",
    }
});


connectDB()
socketHandlers(io); 
initApp(express,app)







