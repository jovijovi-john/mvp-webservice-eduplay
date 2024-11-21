import { Router } from "express";
import { UserController } from "./controllers/UserController";

const router = Router();
const userController = new UserController();

router.get("/users", userController.getUsers);
router.post("/users", userController.saveUser);
