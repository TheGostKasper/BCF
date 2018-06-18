var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var branchSchema = new Schema({
    phone: String,
    location: String,
    name: String,
    created_at: Date,
    updated_at: Date
});
branchSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;