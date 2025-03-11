import express from "express";
import { verifyToken } from "../../../middlewares/jwtAuth.js";
const clientRouter = express.Router();

import { register, getClients } from "../controllers/clientController.js";

clientRouter.post("/register", register);
clientRouter.get("/clients", verifyToken, getClients);

export default clientRouter;
