import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import api from './service/api.js'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())

app.use('*',logger())

app.get('*', api)


serve(app)
