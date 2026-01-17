const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    expect: {
        timeout: 5000
    },
    use: {
        baseURL: 'http://localhost:3001',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    reporter: [['list'], ['html', { open: 'never' }]],
    webServer: {
        command: 'npm run build && node server.js',
        url: 'http://localhost:3001',
        reuseExistingServer: !process.env.CI
    }
});
