const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");

const ArticleSch = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    markdown: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    lastModifiedAt: {type: Date, default: Date.now},
    slug: {type: String, required: true, unique: true},
    otisUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Article = mongoose.model(
    "Article", ArticleSch
);

module.exports = Article;