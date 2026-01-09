import { User } from "../models/user.model.js";
import { ErrorMessage } from "../utils/errorMessage.js";

export const userExist = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ErrorMessage(401, "User Doesn't exist");
  next();
};