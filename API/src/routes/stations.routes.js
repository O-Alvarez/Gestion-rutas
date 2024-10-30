import { Router } from "express"
import {
    getStations,
    postStation,
    putStation,
    delStation
} from "../controllers/stations.controller"


const router = Router()
router.get("/Stations", getStations );
router.post("/new-station", postStation);
router.delete("/del-station/:IdParada", delStation);
router.put("/mod-station/:IdParada", putStation); 


export default router;
