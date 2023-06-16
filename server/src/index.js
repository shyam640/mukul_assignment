import express from "express";
import cors from "cors"; //->communition between backend and frontend
import mongoose from "mongoose";

import {userRouter} from './routes/users.js'
import { blogRouter } from "./routes/blogs.js";

const app = express();
app.use(express.json()); //data from frontend convert into json;
app.use(cors());

app.use("/auth",userRouter);
app.use("/blog",blogRouter);
app.get('*', (req, res) => {
});



mongoose.connect(
    "mongodb+srv://Blog:blog_lpu73@cluster0.zady7zg.mongodb.net/Cluster0?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
);

app.listen(1000, () => console.log("Server Started!!"));





