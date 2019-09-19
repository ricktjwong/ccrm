import request from 'supertest'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../../config'
import { sequelize } from '../../../sequelize'
import { populateTables } from '../../helpers/populateTables'
let app = require('../../../app')

describe('route endpoints', () => {
  afterAll(async () => {
    await sequelize.close()
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
    await populateTables()
  })

  describe('unprotected routes', () => {
    // GET users/
    it('should return 401 for unauthorised access to endpoint (users)', async () => {
      await request(app)
        .get('/users')
        .expect(401)
    })

    // GET cases/
    it('should return 401 for unauthorised access to endpoint (cases)', async () => {
      await request(app)
        .get('/cases')
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
  })

  describe('protected routes', () => {
    let token = jwt.sign({ id: 1 }, jwtConfig.secret, { expiresIn: jwtConfig.expiry })

    describe('users routes', () => {
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

        let resGet = await request(app)
          .get('/users/3')
          .set('cookie', 'jwt=' + token)
          .expect(200)
        expect(resGet.body['name']).toBe('test')
        expect(resPost.body['email']).toBe('test@user.com')
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

    describe('cases routes', () => {
      // GET cases/
      it('should return 200 and get two cases', async () => {
        let res = await request(app)
          .get('/cases')
          .set('cookie', 'jwt=' + token)
          .expect(200)
        expect(res.body.length).toBe(2)
      })

      // GET cases/:id
      it('should return 200 and get one case', async () => {
        let res = await request(app)
          .get('/cases/1')
          .set('cookie', 'jwt=' + token)
          .expect(200)
        expect(res.body['assignedAgency']).toBe('MOE')
      })

      // GET cases/:id/messages
      it('should return 200 and get two messages', async () => {
        let res = await request(app)
          .get('/cases/1/messages')
          .set('cookie', 'jwt=' + token)
          .expect(200)
        expect(res.body.length).toBe(2)
      })

      // POST cases/:id/messages
      it('should return 201 after creating a new message', async () => {
        let resPost = await request(app)
          .post('/cases/1/messages')
          .set('cookie', 'jwt=' + token)
          .send({
            text: 'New message',
          })
          .expect(201)
        expect(resPost.body['text']).toBe('New message')

        let resGet = await request(app)
          .get('/cases/1')
          .set('cookie', 'jwt=' + token)
          .expect(200)
        expect(resGet.body['messages'].length).toBe(3)
      })

      // GET cases/:id/events
      it('should return 200 and get one event', async () => {
        let res = await request(app)
          .get('/cases/1/events')
          .set('cookie', 'jwt=' + token)
          .expect(200)
        expect(res.body.length).toBe(1)
      })

      // POST cases/:id/events
      it('should return 201 after creating a new event', async () => {
        let resPost = await request(app)
          .post('/cases/1/events')
          .set('cookie', 'jwt=' + token)
          .send({
            subject: 'Test subject',
            details: 'Test details',
          })
          .expect(201)
        expect(resPost.body['subject']).toBe('Test subject')
        expect(resPost.body['details']).toBe('Test details')

        let resGet = await request(app)
          .get('/cases/1/events')
          .set('cookie', 'jwt=' + token)
          .expect(200)
        expect(resGet.body.length).toBe(2)
      })
    })
  })
})
