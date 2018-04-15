const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    origUrl: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    }
});

mongoose.model('urls', UrlSchema);