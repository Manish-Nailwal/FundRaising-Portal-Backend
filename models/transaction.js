const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const transactionSchema=new Schema({
    amount: Number,
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver : {
        type: Schema.Types.ObjectId,
        ref: 'Fund'
    },
    fundowner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: { type: Date, default: Date.now }
})

const Transaction=mongoose.model('Transaction',transactionSchema);
module.exports=Transaction;