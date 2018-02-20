'use strict';
/* global describe */

const fs = require('fs');
const path = require('path');

const Preprocesser = require('./../');
const preprocess = new Preprocesser({
    templatePath: path.join(__dirname, 'fixtures')
});

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

    it('shouldn\'t affect overall formatting of a template', function() {
        const output = preprocess(markdown, {name: 'Steven'});
        expect(output.replace('Steven', '{{name}}')).to.equal(markdown);
    });
});

describe('Preprocess file helper', function() {
    let markdown;

    before(function(done) {
        fs.readFile(path.join(__dirname, 'fixtures', 'test2.md'), 'utf8', function(err, data) {
            markdown = data;
            done();
        });
    });

    it('should insert files into other files', function() {
        const context = {
            name: 'Steven',
            greeting: 'Buongiorno',
            emotion: 'excited'
        };
        expect(preprocess(markdown, context)).to.contain("Buongiorno, my name is Steven.  I'm very excited to meet you.");
    });

    it('should insert files into other files into other files', function() {
        const context = {
            name: 'Steven',
            greeting: 'Buongiorno',
            emotion: 'excited'
        };
        expect(preprocess(markdown, context)).to.contain('Recursion!');
    });
});

describe('Conditional helpers', function() {
    let markdown;

    before(function(done) {
        fs.readFile(path.join(__dirname, 'fixtures', 'test5.md'), 'utf8', function(err, data) {
            markdown = data;
            done();
        });
    });

    it('should display AWS content to AWS users', function() {
        const context = { isAWS: true };
        const output = preprocess(markdown, context);
        expect(output).to.contain('AWS-specific content');
    });

    it('should display Azure content to Azure users', function() {
        const context = { isAzure: true };
        const output = preprocess(markdown, context);
        expect(output).to.contain('Azure-specific content');
    });
});
