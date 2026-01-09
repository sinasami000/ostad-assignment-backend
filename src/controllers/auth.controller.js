import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ErrorMessage } from "../utils/errorMessage.js";

export const registerUser = async (req, res) => {
  const { firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup } =
    req.body;
  const userExist = await User.findOne({ NIDNumber });
  if (userExist) throw new ErrorMessage(400, "user already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    firstName,
    lastName,
    NIDNumber,
    phoneNumber,
    password: hashedPassword,
    bloodGroup,
  });
  return res.status(201).json(createdUser);
};

export const loginUser = async (req, res) => {
  const { NIDNumber, password } = req.body;
  try {
    const foundedUser = await User.findOne({ NIDNumber });
    if (!foundedUser) throw new ErrorMessage(400,"User not found"); //return res.json(400).json({ message: "User not found" });
    const isValidPass = bcrypt.compare(password, foundedUser.password);
    if (!isValidPass)
      throw new ErrorMessage(400,"Invalid password"); //return res.status(400).json({ message: "Invalid password" });
    const token = jwt.sign({ _id: User._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { httpOnly: true });
    return res.json({ message: "Login successfull" });
  } catch (error) {
    console.log(error);
  }
};
