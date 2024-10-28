import {Schema ,model} from "mongoose";

const logsSchema = new Schema({
    collection_name:{
        type: String,
        required: true
    },
    data:{
        type: Object,
        required: true
    },
    httpMethod:{
        type: String,
        required: true
    },
    devices:[
        {
            type: Schema.Types.ObjectId,
            ref: "Device",
            required: true
        }
    ],
    tenant_id:{
        type: String,
        required: true
    }
})

const logsModel = model("Logs" , logsSchema);
export default logsModel