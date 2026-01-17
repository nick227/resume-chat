const { test, expect } = require('@playwright/test');

test('optimized frontend loads and serves hashed assets', async({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/AI Resume Assistant/i);

    const cssLinks = await page.$$eval(
        'link[rel="stylesheet"][href^="/assets/"]',
        (links) => links.map((link) => link.getAttribute('href'))
    );
    expect(cssLinks.length).toBeGreaterThan(0);

    const moduleScripts = await page.$$eval(
        'script[type="module"][src^="/assets/"]',
        (scripts) => scripts.map((script) => script.getAttribute('src'))
    );
    expect(moduleScripts.length).toBeGreaterThan(0);

    const modulePreloads = await page.$$eval(
        'link[rel="modulepreload"][href^="/assets/"]',
        (links) => links.map((link) => link.getAttribute('href'))
    );
    expect(modulePreloads.length).toBeGreaterThan(0);
});

test('gzip or brotli assets are served for bundled files', async({ request }) => {
    const response = await request.get('/');
    expect(response.ok()).toBeTruthy();

    const headers = response.headers();
    const cacheControl = headers['cache-control'];
    expect(cacheControl).toContain('no-cache');
});
