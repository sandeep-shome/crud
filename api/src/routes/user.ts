import express, { Router } from "express";
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/user";
import userSchema from "../schemas/userSchema";
import { validateSchema } from "../middlewares/schemaValidator";

const router: Router = express.Router();

//get user
router.get("/", getUsers);
//add user
router.post("/add", validateSchema(userSchema), addUser);
//update user
router.put("/update/:userId", updateUser);
//delete user
router.delete("/delete/:userId", deleteUser);

export default router;
