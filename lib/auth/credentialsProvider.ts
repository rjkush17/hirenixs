import CredentialsProvider from "next-auth/providers/credentials";
import type { User as AuthUser } from "next-auth";
import connectDB from "@/database/Database";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";

export type LoginCredentials = Partial<
    Record<"identifier" | "password", unknown>
> | null;

const credentialsprovider = CredentialsProvider({
    name: "Credentials",
    credentials: {
        identifier: {
            type: "text",
            label: "Email or Username",
            placeholder: "johndoe@gmail.com",
        },
        password: {
            type: "password",
            label: "Password",
            placeholder: "*****",
        },
    },

    authorize: async (
        credentials: LoginCredentials,
    ): Promise<AuthUser | null> => {
        if (!credentials) return null;

        const identifier =
            typeof credentials.identifier === "string"
                ? credentials.identifier
                : undefined;

        const password =
            typeof credentials.password === "string"
                ? credentials.password
                : undefined;

        if (!identifier || !password) return null;

        await connectDB();

        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });

        if (!user || !user.password) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        };
    },
});

export default credentialsprovider;
