import * as dotenv from "dotenv";
import express from "express";
import cors, { CorsOptions } from "cors";
import { Sequelize } from "sequelize"
import setupDatabase from "./models"
import {userRouter} from './controllers/user.controller'
import {reqRouter} from './controllers/request.controller'
import {errorHandler} from './middlewares/error.middleware'

dotenv.config();

const app = express();

const frontendURL = process.env.CLIENT_URL || "http://localhost:8080" // defaults to vue dev server

const corsOptions: CorsOptions = {origin: frontendURL, }



const dbUrl = process.env.DB_URL
if (!dbUrl) {
    throw new Error("database url is required for this app to function");
}
const isProduction = process.env.NODE_ENV == 'production'

const sequelize = new Sequelize(dbUrl, {dialectOptions:{
    ssl: {
        require: isProduction,
        rejectUnauthorized: false
    }
}})

setupDatabase(sequelize)

app.use(cors(corsOptions));
app.use(express.json());

app.use(errorHandler)

app.use("/users", userRouter)
app.use("/leaves", reqRouter)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});