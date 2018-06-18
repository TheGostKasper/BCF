var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemsSchema = new Schema({
    name: { type: String, required: true },
    subCategory_id: { type: String, required: true },
    branch_id: { type: String, required: true },
    supplier_id: { type: String, required: true },
    volume: { type: String, required: true },
    price:{ type: Number, required: true },
    quantity:{ type: Number, required: true },
    image: { type: String, required: false },
    availability: Boolean,
    // extra: {
    //     comments: [{ user_id: String, comment: String, created_at: Date }],
    //     likes: { type: Number, default: 0 },
    //     points: { type: Number, default: 0 }
    // },
    // rate: { type: Number, default: 5 },
    created_at: Date,
    updated_at: Date,
});
itemsSchema.pre('save', (next) => {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Items = mongoose.model('Items', itemsSchema);
module.exports = Items;