import config from './src/config.js'
import app from './index.js'
import { serve } from 'https://deno.land/std/http/server.ts'


serve(app.fetch, { port: config.PORT })
