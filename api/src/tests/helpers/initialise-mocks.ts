import UserMock from '../mocks/User'
import CaseMock from '../mocks/Case'
import MessageMock from '../mocks/Message'
import EventMock from '../mocks/Event'
import SequelizeMock from '../mocks/Sequelize'

export const initialiseMocks = () => {
  jest.mock('../../models/User', () => {
    return {
      _esModule: true,
      default: UserMock,
    }
  })

  jest.mock('../../models/Case', () => {
    return {
      _esModule: true,
      default: CaseMock,
    }
  })

  jest.mock('../../models/Message', () => {
    return {
      _esModule: true,
      default: MessageMock,
    }
  })

  jest.mock('../../models/Event', () => {
    return {
      _esModule: true,
      default: EventMock,
    }
  })

  jest.mock('../../sequelize', () => {
    return {
      _esModule: true,
      sequelize: SequelizeMock,
    }
  })
}
