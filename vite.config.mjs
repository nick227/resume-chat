import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const esbuildTargets = browserslistToEsbuild();
const lightningTargets = browserslistToTargets(browserslist());

const htmlTransformPlugin = () => ({
    name: 'html-transform',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html, ctx) {
        const bundle = ctx && ctx.bundle ? ctx.bundle : null;
        if (!bundle) {
            return html;
        }

        const entryChunk = Object.values(bundle).find(
            (item) => item.type === 'chunk' && item.isEntry
        );

        if (!entryChunk) {
            return html;
        }

        const tags = [];
        const fontStylesheets = [];
        const fontLinkRegex = /<link[^>]+href=["'](https:\/\/fonts\.googleapis\.com\/[^"']+)["'][^>]*>/gi;
        let fontMatch = fontLinkRegex.exec(html);
        while (fontMatch) {
            fontStylesheets.push(fontMatch[1]);
            fontMatch = fontLinkRegex.exec(html);
        }

        if (fontStylesheets.length) {
            tags.push({
                tag: 'link',
                attrs: {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com'
                },
                injectTo: 'head'
            });
            tags.push({
                tag: 'link',
                attrs: {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: ''
                },
                injectTo: 'head'
            });
        }
        const importedCss = entryChunk.viteMetadata && entryChunk.viteMetadata.importedCss
            ? Array.from(entryChunk.viteMetadata.importedCss)
            : [];

        importedCss.forEach((href) => {
            tags.push({
                tag: 'link',
                attrs: {
                    rel: 'preload',
                    href: `/${href}`,
                    as: 'style'
                },
                injectTo: 'head'
            });
        });

        fontStylesheets.forEach((href) => {
            tags.push({
                tag: 'link',
                attrs: {
                    rel: 'stylesheet',
                    href,
                    media: 'print',
                    onload: "this.media='all'"
                },
                injectTo: 'head'
            });
        });

        const preloadTargets = new Set([entryChunk.fileName, ...(entryChunk.imports || [])]);
        preloadTargets.forEach((href) => {
            tags.push({
                tag: 'link',
                attrs: {
                    rel: 'modulepreload',
                    href: `/${href}`
                },
                injectTo: 'head'
            });
        });

        return { html, tags };
    }
});

export default defineConfig({
    root: path.resolve(__dirname, 'public'),
    publicDir: false,
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
        assetsDir: 'assets',
        manifest: true,
        modulePreload: false,
        target: esbuildTargets,
        cssMinify: 'lightningcss'
    },
    css: {
        transformer: 'lightningcss',
        lightningcss: {
            targets: lightningTargets
        }
    },
    plugins: [
        htmlTransformPlugin(),
        viteStaticCopy({
            targets: [{
                src: 'images/**/*',
                dest: 'images'
            }, {
                src: 'uploads/**/*',
                dest: 'uploads'
            }]
        }),
        compression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 1024,
            filter: /\.(js|mjs|css|svg|json|txt|woff2?)$/i
        }),
        compression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 1024,
            filter: /\.(js|mjs|css|svg|json|txt|woff2?)$/i
        })
    ]
});
