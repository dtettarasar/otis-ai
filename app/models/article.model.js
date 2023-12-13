const mongoose = require("mongoose");
const {marked} = require("marked");

//See https://www.npmjs.com/package/dompurify for more details
// Tools used to remove potential malicious code passed in the markdown field
const createDomPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const ArticleSch = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    markdown: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    lastModifiedAt: {type: Date, default: Date.now},
    otisUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    sanitizedHtml : {type: String, required: true}
});

ArticleSch.pre("validate", function (next) {

    if (this.markdown) {

        const markdownToHtml = marked(this.markdown);

        this.sanitizedHtml = dompurify.sanitize(markdownToHtml);

    }

    next();

})

const Article = mongoose.model(
    "Article", ArticleSch
);

module.exports = Article;