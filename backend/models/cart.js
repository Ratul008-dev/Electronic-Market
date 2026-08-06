import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type:Array,
        default: []
    }
});
export default mongoose.model('Cart', cartSchema);
