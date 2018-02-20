{{{file 'test1.md'}}}

{{#if isAzure}}
This paragraph contains Azure-specific content. It shouldn't be displayed to AWS customers.
{{/if}}

{{#if isAWS}}
This paragraph contains AWS-specific content.  It shouldn't be displayed to Azure customers.
{{/if}}