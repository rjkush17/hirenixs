import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/database/Database";
import { User, IUser } from "@/models/user";
import bcrypt from "bcryptjs";

const credentialsprovider = CredentialsProvider({
  // name
  name: "Credentials",
// TODO: Upgrade this to OTP login to 
  // credentials details that
  credentials: {
    identifier: {
      type: "string",
      label: "Email",
      placeholder: "johndoe@gmail.com",
    },
    password: {
      type: "password",
      label: "Password",
      placeholder: "*****",
    },
  },

  // custome loginc function
  authorize: async (credentials: any) => {
    try {
      await connectDB();

      const { identifier, password } = credentials;

      const user: IUser | null = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });
      if (!user) throw new Error("User not found");
      if (!user || !user.password) throw new Error("Pasword not found");

      const isMatch = bcrypt.compare(password, user.password);

      if (!isMatch) throw new Error("Incorrect Passowrd");
      const plainUser = user.toObject();
      delete plainUser.password;
      delete plainUser.createdAt;
      delete plainUser.updatedAt;

      return plainUser;
    } catch (error) {}
  },
});

export default credentialsprovider;
