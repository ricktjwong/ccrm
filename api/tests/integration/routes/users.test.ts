import request from 'supertest'
import jwt from 'jwt-simple'
import { jwtConfig } from '../../../config'
import { sequelize } from '../../../sequelize'
import { populateTables } from '../../../scripts/populateTables'
let app = require('../../../app')

describe('check users routes', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
    await populateTables()
  })

  // GET users/
  it('should return 401 for unauthorised access to endpoint', async () => {
    await request(app)
      .get('/users')
      .expect(401)
  })

  // POST users/login
  it('should return 200 after validating and sending email', async () => {
    let res = await request(app)
      .post('/users/login')
      .send({ email: 'admin@opengov.com' })
      .expect(200)
    expect(res.body).toBe('Email sent')
  })

  describe('Test protected user routes', () => {
    const timestamp = new Date().getTime()
    let token = jwt.encode({ sub: 1, iat: timestamp }, jwtConfig.secret)

    // POST users/login/callback
    it('should return 200 after validating JWT and setting cookie', async () => {
      let resPost = await request(app)
        .post('/users/login/callback')
        .send({ token })
        .expect(200)
      expect(resPost.body).toBe('Cookie set')
    })

    // POST users/
    it('should return 201 after creating a new user', async () => {
      let resPost = await request(app)
        .post('/users')
        .set('cookie', 'jwt=' + token)
        .send({
          name: 'test',
          email: 'test@user.com',
        })
        .expect(201)
      expect(resPost.body).toBe('User added with ID: 3')

      let resGet = await request(app)
        .get('/users/3')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(resGet.body['name']).toBe('test')
    })

    // DELETE users/:id
    it('should return 200 after deleting a user', async () => {
      let resDel = await request(app)
        .delete('/users/2')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(resDel.body).toBe('User deleted with ID: 2')

      let resGet = await request(app)
        .get('/users')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(resGet.body.length).toBe(1)
    })

    // GET users
    it('should return 200 for authorised access to endpoint and get two users', async () => {
      let res = await request(app)
        .get('/users')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(res.body.length).toBe(2)
    })

    // GET users/:id
    it('should return 200 and get one user', async () => {
      let res = await request(app)
        .get('/users/1')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(res.body['name']).toBe('admin')
      expect(res.body['email']).toBe('admin@opengov.com')
    })

    // GET users/:id/cases
    it('should return 200 and get two cases', async () => {
      let res = await request(app)
        .get('/users/1/cases')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(res.body.length).toBe(2)
    })

    // PUT users/:id
    it('should return 200 and update email address and name of user two', async () => {
      let res = await request(app)
        .put('/users/2')
        .set('cookie', 'jwt=' + token)
        .send({
          name: 'admin3',
          email: 'admin3@opengov.com',
        })
        .expect(200)
      let updatedUser = res.body
      expect(updatedUser['name']).toBe('admin3')
      expect(updatedUser['email']).toBe('admin3@opengov.com')
    })
  })
})
