const mongoose = require('mongoose');

async function connectDB(){
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

// Handle connection events for better monitoring
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
  });

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });


module.exports = connectDB;