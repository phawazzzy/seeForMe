let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let imageSchema = new Schema({
    name: { type: String },
    email: {type: String},
    currency: {type: String},
    images: {type: Array},
    createdOn: { type: Date, default: Date.now }
})

module.exports = mongoose.model('image', imageSchema);