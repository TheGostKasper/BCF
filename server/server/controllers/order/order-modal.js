var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    orderNumber: { type: String, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    total: { type: Number, required: true },
    status: { type: String, required: false }, // pending , delivered , deleted , ready
    availability: Boolean,
    items: {
        type: [{
            item_id: String,quantity:Number, replaced_id: String, created_at: Date, updated_at: Date, status: String
        }],
        required: true
    }, 
    extra: {
        payment: [{
             user_id: String, cost: Number, cash: Number, created_at: Date
        }],
    },
    created_at: Date,
    updated_at: Date,
});
orderSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;