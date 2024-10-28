import {Schema ,model} from "mongoose";

const vatsSchema = new Schema({
    name: {
        type: String,
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

const vatsModel = model("Vats" , vatsSchema);
export default vatsModel