/**
 * 注册获取 客户端id 客户端密钥
 */
const clientID = 'aa170974839e19dc02c9'
const clientSecret = '75cb932e1d57f21c2cc0e6576f4417c493f62c7a'

const { createServer } = require('http')
const { parse } = require('url')
const axios = require('axios')
const server = createServer(handler)
server.listen(8080, () => {
  console.log('8080 on port')
})

function handler(req, res) {
  const { pathname, query } = parse(req.url, true)
  req.__query = query
  switch (pathname) {
    case '/favicon.ico':
      return res.end()
    case '/':
      return home(req, res)
    case '/oauth/redirect':
      return oauth(req, res)
    default:
      return res.end('404')
  }
}

async function oauth(req, res) {
  const requestToken = req.__query.code
  //fetch accessToken
  const tokenResponse = await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${clientID}&` +
      `client_secret=${clientSecret}&` +
      `code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  })
  const accessToken = tokenResponse.data.access_token
  //fetch user msg
  const userResponse = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  })
  const user = userResponse.data
  const { login: name } = user
  res.end(`Welcome ${name}!`)
}

function home(req, res) {
  const authorize_uri = 'https://github.com/login/oauth/authorize'
  const redirect_uri = 'http://localhost:8080/oauth/redirect'

  const href = `${authorize_uri}?client_id=${clientID}&redirect_uri=${redirect_uri}`
  res.end(`<a id="login" href="${href}">Login with GitHub</a>`)
}