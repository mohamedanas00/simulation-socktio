import mongoose from "mongoose";

const connectDB =async() =>{
    return await mongoose 
    .connect(process.env.MONGO_URI)
    .then(() => console.log(` DB Connected ✅ .....`))
    .catch((err) => console.log(` Fail to connect DB❌......${err} `));
}

export default connectDB