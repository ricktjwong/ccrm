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
    // GET cases/
    it('should return 401 for unauthorised access to endpoint (cases)', async () => {
      await request(app)
        .get('/cases')
        .expect(401)
    })
  })

  describe('protected routes', () => {
    let userId = 1 as number | any
    let token = jwt.sign({ sub: userId }, jwtConfig.secret, { expiresIn: jwtConfig.expiry })

    // GET cases/
    it('should return 200 and get two cases', async () => {
      let res = await request(app)
        .get('/cases')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(res.body.length).toBe(1)
    })

    // GET cases/:id
    it('should return 200 and get one case', async () => {
      let res = await request(app)
        .get('/cases/1')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(res.body['caseDesc']).toBe('Single family, requires education grant for son')
    })

    // GET cases/:id/messages
    it('should return 200 and get two messages', async () => {
      let res = await request(app)
        .get('/cases/1/messages')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(res.body[0]['text']).toBe('Test message')
    })

    // POST cases/:id/messages
    it('should return 201 after creating a new message', async () => {
      let res = await request(app)
        .post('/cases/1/messages')
        .set('cookie', 'jwt=' + token)
        .send({
          text: 'New message',
        })
        .expect(201)
      expect(res.body['text']).toBe('New message')
    })

    // GET cases/:id/events
    it('should return 200 and get one event', async () => {
      let res = await request(app)
        .get('/cases/1/events')
        .set('cookie', 'jwt=' + token)
        .expect(200)
      expect(res.body[0]['subject']).toBe('Test event')
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
    })

    // POST cases/:id/transfer
    it('should return 201 after creating a new transfer event', async () => {
      let resPost = await request(app)
        .post('/cases/1/transfer')
        .set('cookie', 'jwt=' + token)
        .send({
          subject: 'Transfer',
          details: {
            userFrom: 1,
            userTo: 2,
          },
        })
        .expect(201)
      expect(resPost.body['subject']).toBe('Transfer')
      expect(resPost.body['details']['userTo']).toBe(2)
    })

    it('should return 200 after updating a case with new user', async () => {
      let res = await request(app)
        .put('/cases/1/transfer/accept')
        .set('cookie', 'jwt=' + token)
        .expect(201)
      expect(res.body['subject']).toBe('Transfer')
    })
  })
})
