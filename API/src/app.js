// importacion y ejecucion de express
import express from "express";
import cors from "cors";
import config from "./config";
import rutas from "./routes/rutas.routes";
import station from "./routes/stations.routes";
import types from "./routes/types.routes";

const app = express();


//configueracion del puerto
app.set("port", config.port);

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//rutas
app.use(rutas, station, types);
export default app;
