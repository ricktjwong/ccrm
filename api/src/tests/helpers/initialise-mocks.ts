import UserMock from '../mocks/User'
import CaseMock from '../mocks/Cases'

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
}
