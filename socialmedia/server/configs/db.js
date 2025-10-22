// import mongoose from 'mongoose';
// const connectDB =async()=>{
//   try{
//     mongoose.connection.on('connected',()=>console.log('Database connected'))
//     await mongoose.connect(`${process.env.MONGODB_URL}/pingup`)
//   }
//   catch(error){
//     console.log(error.message)

//   }
// }
// export default connectDB;

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Connect to MongoDB first
    await mongoose.connect(`${process.env.MONGODB_URL}/pingup`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Then confirm connection
    mongoose.connection.on('connected', () => {
      console.log('✅ Database connected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
