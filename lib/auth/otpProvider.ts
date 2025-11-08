import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/database/Database";
import { User, IUser } from "@/models/user";
import { LoginOTP, ILoginOTP } from "@/models/loginotp";

export const otpProvider = CredentialsProvider({
    id: "otp",
    name: "OTP Login",
    credentials: {
        identifier: {
            type: "text", // ✅ fixed typo (was "typoe")
            label: "Email or Username",
            placeholder: "johndoe@gmail.com",
        },
        pin: {
            type: "text", // ✅ changed from "pin" to "text" (valid HTML input type)
            label: "OTP",
            placeholder: "Enter your OTP",
        },
    },

    authorize: async (credentials: any) => {
        try {
            await connectDB();

            const { pin, identifier } = credentials;

            const user: IUser | null = await User.findOne({
                $or: [{ email: identifier }, { username: identifier }],
            });
            if (!user) throw new Error("User not found");

            const otpRecord: ILoginOTP | null = await LoginOTP.findOne({
                email: user.email,
            });
            if (!otpRecord) throw new Error("OTP expired or not found");

            if (pin !== otpRecord.otp) throw new Error("Incorrect OTP");

            const now = Date.now();
            const expireTime = otpRecord.generatedTime + 1 * 60 * 1000;
            if (now > expireTime) throw new Error("OTP expired");

            await LoginOTP.deleteOne({ email: user.email });

            return user;
        } catch (error) {
            console.error("OTP Login Error:", error);
            return null;
        }
    },
});

export default otpProvider;
