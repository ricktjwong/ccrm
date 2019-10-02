import UserMock from '../../mocks/User'
import CaseMock from '../../mocks/Case'
import jwt from 'jsonwebtoken'
import request from 'supertest'
import { jwtConfig } from '../../../config'
import { initialiseMocks } from '../../helpers/initialise-mocks'

initialiseMocks()
let app = require('../../../app')

describe('users route endpoints', () => {
  afterEach(() => {
    UserMock.$queryInterface.$clearHandlers()
    CaseMock.$queryInterface.$clearHandlers()
  })

  describe('unprotected routes', () => {
    // GET users/
    it('should return 401 for unauthorised access to endpoint (users)', async () => {
      await request(app)
        .get('/users')
        .expect(401)
    })

    // POST users/login
    // TODO: Rework test to verify that nodemailer was called
    test.skip('should return 200 after validating and sending email', async () => {
      let res = await request(app)
        .post('/users/login')
        .send({ email: 'test@opengov.com' })
        .expect(200)
      expect(res.body['id']).toBe(1)
    })
  })

  describe('protected routes', () => {
    let userId = 1 as number | any
    let token = jwt.sign({ sub: userId }, jwtConfig.secret, { expiresIn: jwtConfig.expiry })

    // POST users/login/callback
    it('should return 200 after validating JWT and setting cookie', async () => {
      let res = await request(app)
        .post('/users/login/callback')
        .send({ token })
        .expect(200)
      expect(res.body).toBe('Cookie set')
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
      expect(resPost.body['name']).toBe('test')
      expect(resPost.body['email']).toBe('test@user.com')
    })

    // DELETE users/:id
    it('should return 200 after deleting a user', async () => {
      let resDel = await request(app)
        .delete('/users/1')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(resDel.body).toBe('User deleted with ID: 1')
    })

    // GET users
    it('should return 200 for authorised access to endpoint and get one user', async () => {
      let res = await request(app)
        .get('/users')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(res.body.length).toBe(1)
      expect(res.body[0]['email']).toBe('admin@opengov.com')
    })

    // GET users/:id
    it('should return 200 and get one user', async () => {
      UserMock.$queryInterface.$useHandler(function (query: any, queryOptions: any) {
        if (query === 'findOne') {
          if (queryOptions[0].where.id === 1) {
            return UserMock.build({
              id: 1,
              name: 'test',
              email: 'test@test.com',
            })
          } else {
            return null
          }
        }
      })
      let res = await request(app)
        .get('/users/1')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(res.body['name']).toBe('test')
      expect(res.body['email']).toBe('test@test.com')
    })

    // GET users/:id/cases
    it('should return 200 and get one case', async () => {
      let res = await request(app)
        .get('/users/1/cases')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(res.body.length).toBe(1)
      expect(res.body[0]['caseDesc']).toBe('Single family, requires education grant for son')
    })

    // PUT users/:id
    it('should return 200 and update email address and name of user one', async () => {
      UserMock.$queryInterface.$useHandler(function (query: any, queryOptions: any) {
        if (query === 'findOne') {
          if (queryOptions[0].where.id === 1) {
            return UserMock.build({
              id: 1,
              name: 'admin3',
              email: 'admin3@opengov.com',
            })
          } else {
            return null
          }
        }
      })
      let res = await request(app)
        .put('/users/1')
        .set('cookie', 'jwt=' + token)
        .send({
          name: 'admin3',
          email: 'admin3@opengov.com',
        })
        .expect(200)
      let user = res.body
      expect(user['name']).toBe('admin3')
      expect(user['email']).toBe('admin3@opengov.com')
    })

    it('should return 200 after getting pending cases', async () => {
      await request(app)
        .get('/users/1/cases/pending')
        .set('cookie', 'jwt=' + token)
        .expect(200)
    })
  })
})
