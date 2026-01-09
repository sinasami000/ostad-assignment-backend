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

router.post("/register", registerUser);
router.post("/login", loginUser);

router
  .route("/:id")
  .get(protect, getSingleUser)
  .delete(protect, deleteUser)
  .put(protect, updateUser);

router.get("/", protect, getAllUsers);


export default router;