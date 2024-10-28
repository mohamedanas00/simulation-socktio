import {Schema ,model} from "mongoose";

const branchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tenant_id:{
        type: String,
        required: true
    }

})


const branchModel = model("Branch" , branchSchema);

export default branchModel