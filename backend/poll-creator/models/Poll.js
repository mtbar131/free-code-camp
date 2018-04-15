const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    options: {
        A: {
            type: String,
            required: true
        },
        B: {
            type: String,
            required: true
        },
        C: {
            type: String,
            required: false
        },
        D: {
            type: String,
            required: false
        }
    },
    totalVotes: {
        type: Number,
        required: true,
        default: 0
    },
    score: {
        A: {
            type: Number,
            required: true,
            default: 0
        },
        B: {
            type: Number,
            required: true,
            default: 0
        },
        C: {
            type: Number,
            required: false,
            default: 0
        },
        D: {
            type: Number,
            required: false,
            default: 0
        }
    },
    date: {
        type: String,
        required: true
    }
});

mongoose.model('polls', PollSchema);