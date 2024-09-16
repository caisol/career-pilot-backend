import mongoose from 'mongoose';
import config from 'config';

// Get mongoURI
const dbURI = process.env.MONGO_URI || config.get('MONGO_URI');

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('*** DB connected successfully ***');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

export default connectDB;
