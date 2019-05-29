require('dotenv').config()
const { auth } = require('../index.js')

describe('Authentication', async () => {
  let conf = null
  beforeAll(async () => {
    username = process.env.AUTH0_USERNAME
    password = process.env.AUTH0_PASSWORD
    conf = {
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
      AUTH0_CLIENTID: process.env.AUTH0_CLIENTID,
      AUTH0_CLIENTSECRET: process.env.AUTH0_CLIENTSECRET,
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
      AUTH0_SCOPE: process.env.AUTH0_SCOPE
    }
  })
  it ('should authenticate with valid username and password', async () => {
    let user = await auth(username, password, conf)
    expect(user).toBeTruthy()
    expect(user).toMatchObject({
      access_token: expect.anything(),
      id_token: expect.anything(),
      token_type: "Bearer"
    })
  })
  it ('should fail with invalid username and password', async () => {
    let error = null
    try {
      let user = await auth(username, "BADPASSWORD", conf)
    } catch (err) {
      error = err
    }
    expect(error).toBeTruthy()
    expect(error.message).toEqual("Request failed with status code 403")
  })
})
