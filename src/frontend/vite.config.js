import { stat } from 'fs/promises';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

let cachedContactHandler;
let cachedContactHandlerVersion;
const contactHandlerModuleUrl = new URL('./api/contact.js', import.meta.url);
const contactHandlerFilePath = fileURLToPath(contactHandlerModuleUrl);

async function getContactHandler() {
    const fileStats = await stat(contactHandlerFilePath);
    const nextVersion = String(fileStats.mtimeMs);

    if (!cachedContactHandler || cachedContactHandlerVersion !== nextVersion) {
        const moduleUrl = `${contactHandlerModuleUrl.href}?v=${nextVersion}`;
        const module = await import(moduleUrl);
        cachedContactHandler = module.default;
        cachedContactHandlerVersion = nextVersion;
    }
    return cachedContactHandler;
}

async function readRawBody(req) {
    return await new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => resolve(body));
        req.on('error', reject);
    });
}

function withExpressLikeHelpers(res) {
    const response = Object.create(res);
    response.status = (code) => {
        res.statusCode = code;
        return response;
    };
    response.json = (payload) => {
        if (!res.getHeader('Content-Type')) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
        }
        res.end(JSON.stringify(payload));
        return response;
    };
    return response;
}

function contactApiDevMiddleware() {
    return {
        name: 'contact-api-dev-middleware',
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const requestPath = (req.url || '').split('?')[0];
                if (requestPath !== '/api/contact') {
                    next();
                    return;
                }

                try {
                    const contactHandler = await getContactHandler();
                    const requestWithBody = Object.create(req);
                    requestWithBody.body = await readRawBody(req);
                    await contactHandler(requestWithBody, withExpressLikeHelpers(res));
                } catch (error) {
                    console.error('Local /api/contact middleware failed:', error);
                    const details = error instanceof Error ? error.message : String(error);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                    res.end(JSON.stringify({ error: 'Internal server error', details }));
                }
            });
        }
    };
}

export default defineConfig(({ mode }) => {
    const loadedEnv = loadEnv(mode, process.cwd(), '');
    Object.assign(process.env, loadedEnv);

    return {
        logLevel: 'error',
        build: {
            emptyOutDir: true,
            sourcemap: false,
            minify: false
        },
        css: {
            postcss: './postcss.config.js'
        },
        optimizeDeps: {
            esbuildOptions: {
                define: {
                    global: 'globalThis'
                }
            }
        },
        plugins: [react(), contactApiDevMiddleware()],
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: fileURLToPath(new URL('./src', import.meta.url))
                }
            ]
        }
    };
});
