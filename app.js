import api from './src/service/api.js'
import { handler } from './src/template.js'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import config from './src/config.js'
import { get_runtime, get_url } from './src/util.js'

const app = new Hono()

app.use('*', cors())
app.use('*', logger())
app.get('/api', api)
app.get('/test', handler)
app.get('/', (c) => {

    return c.html(`
                    <html>
                        <head>
                            <title>Meting正在运行</title>
                            <style>
                                .login-box { 
                                    padding: 20px; 
                                    border: 1px solid #ccc; 
                                    max-width: 400px; 
                                    margin: 20px auto 
                                }
                                input { margin: 5px 0; padding: 8px; width: 100% }
                                button { background: #4CAF50; color: white; padding: 10px; border: none }
                            </style>
                        </head>
                        <body>
                            <h1>Meting API</h1>
                            <p>
                                <a href="https://github.com/xizeyoupan/Meting-API" style="text-decoration: none;">
                                    <img alt="Static Badge" src="https://img.shields.io/badge/Github-Meting-green">
                                    <img alt="GitHub forks" src="https://img.shields.io/github/forks/xizeyoupan/Meting-API">
                                    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/xizeyoupan/Meting-API">
                                </a>
                            </p>

                            <p>当前版本：1.0.8</p>
                            <p>当前运行环境：${get_runtime()}</p>
                            <p>当前时间：${new Date()}</p>
                            <p>内部端口：${config.PORT}</p>
                            <p>部署在大陆：${config.OVERSEAS ? '否' : '是'}</p>
                            <p>当前地址：<a>${c.req.url}</a></p>
                            <p>实际地址：<a>${get_url(c)}</a></p>
                            <p>测试地址：<a href="${get_url(c) + 'test'}">${get_url(c) + 'test'}</a></p>
                            <p>api地址：<a href="${get_url(c) + 'api'}">${get_url(c) + 'api'}</a></p>
                            <div class="login-box">
                            <h3>网易云登录</h3>
                            <div>
                                <input type="tel" id="phone" placeholder="手机号码" required>
                                <div style="display:flex;gap:5px">
                                <input type="text" id="captcha" placeholder="验证码" style="flex:2">
                                <button onclick="sendCaptcha()" style="flex:1">获取验证码</button>
                                </div>
                                <button onclick="login()">立即登录</button>
                            </div>
                                <div id="login-status" style="margin-top:10px"></div>
                            </div>
                            <script>
                                async function sendCaptcha() {
                                    const phone = document.getElementById('phone').value
                                    const res = await fetch('/captcha/sent?phone=' + phone)
                                    const data = await res.json()
                                    document.getElementById('login-status').innerHTML = 
                                    data.code === 200 ? '验证码已发送' : '发送失败: ' + data.message
                                }

                                async function login() {
                                    const phone = document.getElementById('phone').value
                                    const captcha = document.getElementById('captcha').value
                                    const res = await fetch(\`/captcha/verify?phone=\${phone}&captcha=\${captcha}\`)
                                    const data = await res.json()
                                    
                                    if(data.code === 200) {
                                    document.getElementById('login-status').innerHTML = 
                                        '登录成功！Cookie已保存'
                                    // 存储Cookie到localStorage
                                    localStorage.setItem('netease-cookie', JSON.stringify(data.cookie))
                                    } else {
                                    document.getElementById('login-status').innerHTML = 
                                        '登录失败: ' + data.message
                                    }
                                }
                            </script>
                        </body>
                    </html>`
    )
})
// 发送验证码
app.get('/captcha/sent', async (c) => {
    const phone = c.req.query('phone')
    const res = await fetch(
      `https://neteasecloudmusicapi.vercel.app/captcha/sent?phone=${phone}`
    )
    return c.json(await res.json())
})
  
  // 验证验证码
app.get('/captcha/verify', async (c) => {
    const phone = c.req.query('phone')
    const captcha = c.req.query('captcha')
    const res = await fetch(
      `https://neteasecloudmusicapi.vercel.app/captcha/verify?phone=${phone}&captcha=${captcha}`
    )
    const data = await res.json()
    
    // 返回网易云的Cookie给前端
    return c.json({
      ...data,
      cookie: res.headers.get('set-cookie') // 获取网易云返回的Cookie
    })
})

export default app
