var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriesSchema = new Schema({
    name: String,
    subCategories: {
        type: [{ name: String, created_at: Date, updated_at: Date }], required: true
    },
    created_at: Date,
    updated_at: Date
});
categoriesSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Categories = mongoose.model('Categories', categoriesSchema);
module.exports = Categories;