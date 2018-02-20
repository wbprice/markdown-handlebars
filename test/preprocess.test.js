'use strict';
/* global describe */

const fs = require('fs');
const path = require('path');

const preprocess = require('./../');
const { expect } = require('chai');

describe('Preprocess', function() {
    let markdown;

    before(function(done) {
        fs.readFile(path.join(__dirname, 'fixtures', 'test1.md'), 'utf8', function(err, data) {
            markdown = data;
            done();
        });
    });

    it('should be a function', function() {
        expect(preprocess).to.be.a('function');
    });

    it('should replace variables in a template', function() {
        expect(preprocess(markdown, {name: 'Steven'})).to.include('Steven');
    });

    it('shouldn\'t change the formatting of a template without any variables', function() {
        console.log(preprocess(markdown, {name: 'Steven'}));
    });
});
