'use strict';

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const { compile } = Handlebars;

function preprocess(text, context) {
    return compile(text)(context);
}

module.exports = function Preprocessor(opts) {
    const { templatePath } = opts;

    if (!templatePath) {
        throw new Error('opts.templatePath must be defined');
    }

    Handlebars.registerHelper('file', function fileHelper(filename, {data}) {
        const context = data.root;
        const markdown = fs.readFileSync(path.join(templatePath, filename), 'utf8');
        return preprocess(markdown, context);
    });

    return preprocess;
};
