import esbuild from 'esbuild';
import resolve from 'esbuild-plugin-resolve';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

esbuild.build({
    entryPoints: ['./index.js'],
    bundle: true,
    format: 'esm',
    outfile: './dist/cloudflare-workers.js',
    external: ['@hono/node-server'],
    plugins: [resolve({
        stream: 'stream-browserify',
        events: 'events-polyfill'
    }),
    NodeGlobalsPolyfillPlugin({
        process: true,
        buffer: true,
    }),
    ],
    minify: true,
});
