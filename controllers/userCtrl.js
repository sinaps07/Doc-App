const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//register callback
const registerController = async (req, res) => {
  try {
    // console.log(req.body.email)
    // console.log(req.body)
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Registration Successful", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: `Register Controller ${error.message}`,
      });
  }
};

//login callback
const loginContoller = async (req, res) => {
  console.log("reaching here")
  try {
    console.log(req.body)
    const user = await userModel.findOne({ email: req.body.email });
    console.log(user)
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Not Exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Inavlid email or password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn:"10s",
    });
    res
      .status(200)
      .send({ message: "Login Successful", success: true, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in login ctrl ${error.message}` });
  }
};
//
const authController=async(req,res)=>{
  console.log(req.body);
  try {
    const user=await userModel.findOne({_id:req.body.userId});
    user.password=undefined;
    if(!user){
      return res
       .status(404)
       .send({message:'User not found',success:false});
    }
    else{
      res.status(200).send({
        success:true,
        data:{
          success:true,
          data:user
        },
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'Auth Error',
      success: false,
      error
    })
  }
};

module.exports = { loginContoller, registerController,authController };
