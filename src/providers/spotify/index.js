import config from "../../config.js"
const support_type = ['song', 'playlist']
const YT_API = config.YT_API
const handle = async (type, id, cookie = '') => {
    let result
    const query = `?server=spotify&type=${type}&id=${id}`
    if (support_type.includes(type)) {
        result = await fetch(YT_API + query)
        result = await result.json()
    } else {
        result = -1
    }

    return result
}

export default {
    register: (ctx) => {
        ctx.register('spotify', { handle, support_type })
    }
}
