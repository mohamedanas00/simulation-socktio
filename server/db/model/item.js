import {Schema ,model} from "mongoose";

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    vat_id:{    
        type: Schema.Types.ObjectId,
        ref: "Vats",
        required: true
    },
    tenant_id:{
        type: String,
        required: true
    }

})

const itemModel = model("Item" , itemSchema);
export default itemModel