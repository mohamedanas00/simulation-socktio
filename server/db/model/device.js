import {Schema ,model} from "mongoose";

const deviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    branchId: {
        type: Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    tenant_id:{
        type: String,
        required: true
    }

})

const deviceModel = model("Device" , deviceSchema);
export default deviceModel