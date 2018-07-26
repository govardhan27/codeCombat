const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageModelSchema = new Schema({
    category_name: String,
    name: String,
    description: String,
    imageURL: [String]
});

mongoose.model('imageModel', imageModelSchema);