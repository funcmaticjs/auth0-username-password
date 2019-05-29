
const axios = require('axios')

async function authWithUsernamePassword(username, password, conf) {
  return (await axios.request({
    method: 'POST',
    url: `https://${conf.AUTH0_DOMAIN}/oauth/token`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      username,
      password,
      grant_type: 'password',
      audience: conf.AUTH0_AUDIENCE,
      scope: conf.AUTH0_SCOPE,
      client_id: conf.AUTH0_CLIENTID,
      client_secret: conf.AUTH0_CLIENTSECRET
    }
  })).data
}

module.exports = {
  auth: authWithUsernamePassword
}