import promotionRouter from "./modules/promotions/promotions.routes.js";
import vatsRouter from "./modules/vats/vats.routes.js";


const initApp = (express, app)=>{
    app.use(express.json())
    const deviceId = 'someDeviceId'; // Replace with the actual device ID you want to access  

    
    
    app.use('/vats',vatsRouter)
    app.use('/promotion',promotionRouter)
    app.use('/*',(req,res,next)=>{
        return res.json({message:"In_ValidRouting"})
    })
}

export default initApp