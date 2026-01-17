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
                HTMLElement: 'readonly',
                CustomEvent: 'readonly',
                IntersectionObserver: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                Event: 'readonly',
                NodeFilter: 'readonly',
                WebSocket: 'readonly',
                URL: 'readonly',
                requestAnimationFrame: 'readonly'
            }
        },
        rules: {
            ...js.configs.recommended.rules
        }
    }
];
