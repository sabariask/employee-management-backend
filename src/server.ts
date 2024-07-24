import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import {connectToDatabase} from './database';
import { employeeRouter } from './employee.routes';

dotenv.config();

const {ATLAS_URI} = process.env;

if(!ATLAS_URI){
    console.error("No ATLAS enviornment variable has been declare on config.env");
    process.exit(1);
}

connectToDatabase(ATLAS_URI).then(()=>{
    const app = express();
    app.use(cors());
    app.use("/employees", employeeRouter);
    app.listen(5200, ()=>{
        console.log(`Server is running at http://localhost:5200...`);
    })
}).catch(error=>console.log(error));