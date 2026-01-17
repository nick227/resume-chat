const js = require('@eslint/js');

module.exports = [
    {
        files: ['public/js/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                localStorage: 'readonly',
                crypto: 'readonly',
                fetch: 'readonly',
                console: 'readonly',
                navigator: 'readonly',
                Image: 'readonly',
                HTMLElement: 'readonly'
            }
        },
        rules: {
            ...js.configs.recommended.rules
        }
    }
];
