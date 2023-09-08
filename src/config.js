import { get_runtime } from "./util.js"

let OVERSEAS = globalThis?.Deno?.env?.get("OVERSEAS") || globalThis?.process?.env?.OVERSEAS
const YT_API = globalThis?.Deno?.env?.get("YT_API") || globalThis?.process?.env?.YT_API
const runtime = get_runtime()

if (['cloudflare', 'vercel'].includes(runtime)) OVERSEAS = true

const PORT = globalThis?.Deno?.env?.get("PORT") || globalThis?.process?.env?.PORT || 3000

OVERSEAS = Boolean(OVERSEAS)

const net_ease_anonymous_token = "de91e1f8119d32e01cc73efcb82c0a30c9137e8d4f88dbf5e3d7bf3f28998f21add2bc8204eeee5e56c0bbb8743574b46ca2c10c35dc172199bef9bf4d60ecdeab066bb4dc737d1c3324751bcc9aaf44c3061cd18d77b7a0"

export default {
    YT_API,
    OVERSEAS,
    PORT,
    net_ease_anonymous_token,
}
