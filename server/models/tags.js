// Tag Document Schema

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var tagSchema = new Schema({
    name: { type: String, required: true },
});

tagSchema.virtual("url").get(function () {
    return `posts/tag/_id`;
});

module.exports = mongoose.model("tagsModel", tagSchema);
