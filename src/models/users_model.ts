import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        required: false,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    token: String,
    isConfirmed: {
        type: Boolean,
        default: false
    }
});
export default mongoose.model('User', userSchema);