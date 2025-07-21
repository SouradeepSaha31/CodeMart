import mongoose from "mongoose"

async function databaseConnection(){
    try {
      const db =  await mongoose.connect(process.env.MONGODB_URL);
      console.log("Database Connection successfull")
        
    } catch (error) {
        console.log("Error in dbConnection:" ,error);
        process.exit(1);
    }
}

export default databaseConnection