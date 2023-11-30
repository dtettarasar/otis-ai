const mongoose = require("mongoose");

const ArticleSch = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    markdown: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    otisUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Article = mongoose.model(
    "Article", ArticleSch
);

module.exports = Article;