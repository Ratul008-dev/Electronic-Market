import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
    },
    problemtype: {
        type: String,
        required: true
    },
    problemmessage: {
        type: String,
        required: true
    }
});
export default mongoose.model("Problem", problemSchema)

