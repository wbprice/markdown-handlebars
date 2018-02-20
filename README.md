# markdown-handlebars
A prototype for preprocessing Markdown files with Handlebars to achieve template insertion/interpolation.

## Usage

Given two files like:

**File A**
```md
# Hello!

This is an example of a file that calls another file.

{{{file './fileb.md'}}}
```
**File B**
```md

{{greeting}}, my name is {{name}}.  I'm very {{emotion}} to meet you.
```

A string like this can be created.

```js
const Preprocessor = require('/path/to/module');
const preprocess = new Preprocessor({templatePath: '/path/to/templates'});

const context = {
    greeting: "Buongiorno",
    name: "Steven",
    emotion: "excited"
};

console.log(preprocess(markdown, context));

/*
# Hello!

This is an example of a file that calls another file.

Buongiorno, my name is Steven.  I'm very excited to meet you.
*/
```

Helpers that come with Handlebars work as expected.

```md
{{#if isAzure}}
This paragraph contains Azure-specific content. It shouldn't be displayed to AWS customers.
{{/if}}

{{#if isAWS}}
This paragraph contains AWS-specific content.  It shouldn't be displayed to Azure customers.
{{/if}}
```

is rendered as the following if `isAzure` is true. 

```md
This paragraph contains Azure-specific content. It shouldn't be displayed to AWS customers.
```