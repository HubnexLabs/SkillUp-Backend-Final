import bcrypt from "bcryptjs";
import { rgisterAdmin, loginAdmin } from "../Repo/adminRepo.js";
import { generateToken } from "../../../middlewares/jwtAuth.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = { email, hashedPassword };
    const adminId = await rgisterAdmin(admin);
    if (adminId.error) {
      return res.status(409).json({ message: adminId.error });
    }
    res.status(201).json({ message: "Admin registered successfully", adminId });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    // const admin = { password, email };
    // const adminId = await loginAdmin(admin);
    // if (adminId.error) {
    //   return res.status(401).json({ message: adminId.error });
    // } else {
    //   const token = generateToken(adminId);
    //   res.status(200).json({ token, message: adminId.success });
    // }
    if(email == "ranveer@hubnex.in" && password == "Skillup@Ranveer@001"){
      const token = generateToken(email);
      res.status(200).json({ token, message: "Login Successful" });
    }else{
       return res.status(401).json({ message: "Invalid Credentials"});
    }
    
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
  }
};
