import bcrypt from 'bcryptjs'
import User from '../models/userModel.js';
import {createError} from '../utils/error.js'
import {generateToken} from '../utils/generateToken.js'


export const register = async(req, res, next) =>  {
    const data = req.body;
    if (!data?.email || !data?.password || !data?.firstname || !data?.lastname) {
        return next(createError(400, "Missing fields"));
    }
    const alreadyRegistered = await User.exists({email: data.email})
    if(alreadyRegistered)
        return next(createError(409, "Email already registered"));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(201).json("User created successfully!");
}

export const login = async(req, res, next) => {
   const data = req.body;

   if (!data?.email || !data?.password) {
    return next(createError(400, "Missing fields"));
  }
  const user = await User.findOne({ email: data.email });
  if (!user) return next(createError(404, "User not found"));
  const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
  if (!isPasswordCorrect) 
    return next(createError(401, "Invalid password provided"));

  await generateToken(user, res)
  res.json({message: "Logged in successfully!"})
  
}

export const logout = async(req, res, next) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }).status(200).json({message: "Logged out successfully"});
}