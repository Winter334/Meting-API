import api from './src/service/api.js'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('*', cors())
app.use('*', logger())
app.get('/api', api)
app.get('/', (c) => c.text('你好！'))

export default app
