import express from "express";
import * as dotenv from "dotenv";
import { connect } from "./config/db.config.js";
import { strainRouter } from "./routes/strain.routes.js";
import cors from "cors";

dotenv.config();
connect();

const app = express();

app.use(cors());
app.use(express.json());


app.use(`/the-healing-cure/strains`, strainRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
