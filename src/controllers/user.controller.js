import { User } from "../models/user.model.js";

export const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  return res.json(user);
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  return res.json(users);
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select("-password");
  return res.json(user)
};


export const deleteUser = async (req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({message: "User deleted successfully"});
}