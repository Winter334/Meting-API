import { get_runtime } from "./util.js"

let OVERSEAS;
const runtime = get_runtime()

if (['cloudflare', 'vercel'].includes(runtime)) OVERSEAS = '1'

const PORT = globalThis?.Deno?.env?.get("PORT") || globalThis?.process?.env?.PORT || 3000

OVERSEAS = (OVERSEAS === '1')

export default {
    OVERSEAS,
    PORT
}
