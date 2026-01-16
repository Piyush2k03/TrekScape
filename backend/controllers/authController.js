// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// /**
//  * 🟢 Register new user
//  */
// export const register = async (req, res) => {
//   try {

//     //hash password
//       const salt =  bcrypt.genSaltSync(10);
//       const hash =  bcrypt.hashSync(req.body.password, salt);
//      console.log("Hashed Password:", hash);

//       const newUser = new User({
//      username:req.body.username,
//         email:req.body.email,
//         password:hash,
//         photo:req.body.photo
//   });

//   await newUser.save();

//     res.status(200).json({
//       success: true,
//       message: "User registered successfully",
//     });
//   } catch (err) {
//     res
//        .status(500)
//        .json({ success: false, message: "Failed to register user" });
//     }
    

// };

// /**
//  * 🟢 Login user (returns JWT token)
//  */
// export const login = async (req, res) => {
//   const email = req.body.email;

//   try {
//     //  Find user by email
//     const user = await User.findOne({ email });

//     //  If user not found
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // Compare entered password with hashed password in DB
//     const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

//     //  If password incorrect
//     if (!checkCorrectPassword) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }

//     const { password, ...rest } = user._doc;

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "20d" }
//     );

  

//     // set token in the browser cookies and send the response to the client
//     res.cookie('accessToken', token, {
//     httpOnly: true,
//     expires: token.expiresIn
//     }).status(200).json({
//     token,
//     success: true,
//     message: 'successfully logged in',
//     data: { ...rest},
//     role,
//     });

//   } catch (err) {
//   console.error("🔥 Login Error Details:", err);
//   res.status(500).json({
//     success: false,
//     message: "Failed to Login",
//     errorDetail: err.message,
//   });
// }

// };
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * 🟢 Register new user
 */
export const register = async (req, res) => {
  try {
    //  Hash password securely
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    console.log("Hashed Password:", hash);

    //  Create new user document
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: err.message,
    });
  }
};

/**
 * 🟢 Login user (returns JWT token)
 */
export const login = async (req, res) => {
  const email = req.body.email;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare password
    const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkCorrectPassword) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Remove password before sending response
    const { password, ...rest } = user._doc;

    //  Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET_KEY,
      { expiresIn: "20d" }
    );

    // Set cookie with token
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days
      })
      .status(200)
      .json({
        success: true,
        message: "Successfully logged in",
        token, // Optional: include token in response
        data: { ...rest },
        role: user.role, // FIX: use user.role
      });
  } catch (err) {
    console.error("Login Error Details:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to Login",
      errorDetail: err.message,
    });
  }
};
