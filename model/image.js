let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let imageSchema = new Schema({
    name: { type: String },
    imgLink: { type: String },
    publicid: { type: String },
    image: {type: String},
    createdOn: { type: Date, default: Date.now }
})

module.exports = mongoose.model('image', imageSchema);