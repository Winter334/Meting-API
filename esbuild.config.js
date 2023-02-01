import esbuild from 'esbuild';
import resolve from 'esbuild-plugin-resolve';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

esbuild.build({
    entryPoints: ['./index.js'],
    bundle: true,
    format: 'esm',
    outfile: './dist/cloudflare-workers.js',
    external: ['@hono/node-server'],
    plugins: [
        resolve({
            crypto: 'crypto-browserify'
        }),
        NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
    ],
    minify: true,
});
