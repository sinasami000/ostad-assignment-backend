import e from "express";
const router = e.Router();
import { protect } from "../middlewares/auth.middleware.js";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/user.controller.js";
import { userExist } from "../middlewares/idExist.middleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);

router
  .route("/:id")
  .get(protect,userExist, getSingleUser)
  .delete(protect,userExist, deleteUser)
  .put(protect,userExist, updateUser);

router.get("/", protect, getAllUsers);


export default router;