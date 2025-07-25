const mongoose=require('mongoose')
const colors=require('colors')
const connectdb=async()=>{
      try {
            console.log("Connecting to:", process.env.MONGO_URL); 
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb connected${mongoose.connection.host}`)
      } catch (error) {
        console.log(`Mongodb Database error ${error}`.bgRed.white)
      }
}
module.exports=connectdb;