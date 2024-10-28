
import {Schema ,model} from "mongoose";

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    branchId:{
        type: Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    tenant_id:{
        type: String,
        required: true
    }

})

const promotionModel = model("Promotion" , promotionSchema);
export default promotionModel