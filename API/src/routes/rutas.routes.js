// Este archivo contiene las URL de las rutas de la API
import { Router } from "express";
import {
  getRutas,
  postRuta,
  deleteRuta,
  updateRuta
} from "../controllers/rutas.controller";

const router = Router();

router.get("/rutas", getRutas);
router.post("/new-ruta", postRuta);
router.delete("/del-ruta/:IdRuta", deleteRuta);
router.put("/mod-ruta/:IdRuta", updateRuta); 
export default router;
