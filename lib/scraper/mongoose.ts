import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) return console.error('MONGO_URI is not defined');

    if(isConnected) {
        console.log('Using existing database connection');
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;

        console.log('Database connected successfully');

    } catch (error: any) {
        console.error(`Failed to connect to the database: ${error.message}`);
        
    }

}