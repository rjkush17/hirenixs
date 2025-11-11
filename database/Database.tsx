import mongoose from "mongoose";

type Cached = {
    connection: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

declare global {
    const mongoose: Cached | undefined;
}

const dbURL: string | undefined = process.env.DATABASE_URL;
if (!dbURL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}

let cached: Cached = (globalThis as any).mongoose ?? { connection: null, promise: null };
globalThis.mongoose = cached;

const connectDB = async () => {
    if (cached.connection) return cached.connection;

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(dbURL, opts).then((mongoose) => mongoose);
    }

    cached.connection = await cached.promise;
    return cached.connection;
};

export default connectDB;

