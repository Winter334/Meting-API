import api from './src/service/api.js'
import config from './src/config.js'

let serve, Hono, logger, cors

const isDeno = config.isDeno
const isNode = globalThis?.process?.release?.name === 'node'

if (isDeno) {
    serve = (await import('https://deno.land/std/http/server.ts')).serve
    Hono = (await import('https://deno.land/x/hono/mod.ts')).Hono
    logger = (await import('https://deno.land/x/hono/middleware.ts')).logger
    cors = (await import('https://deno.land/x/hono/middleware.ts')).cors
} else {
    Hono = (await import('hono')).Hono
    logger = (await import('hono/logger')).logger
    cors = (await import('hono/cors')).cors
}

if (isNode) serve = (await import('@hono/node-server')).serve

const app = new Hono()
app.use('*', cors())
app.use('*', logger())
app.get('/api', api)
app.get('/', (c) => c.text('你好！'))

if (isDeno) {
    serve(app.fetch, { port: config.PORT })
} else if (isNode) {
    serve({
        fetch: app.fetch,
        port: config.PORT
    })
}

export default app
