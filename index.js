'use strict';

const Handlebars = require('handlebars');
const { compile, registerHelper } = Handlebars;

registerHelper('file', function(path) {

});

function preprocess(text, context) {
    return compile(text)(context);
}

module.exports = preprocess;

