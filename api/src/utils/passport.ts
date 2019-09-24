import { User } from '../models'
import { jwtConfig } from '../config'
const JwtStrategy = require('passport-jwt').Strategy

const cookieExtractor = function (req: any) {
  var token = null
  if (req && req.cookies !== undefined) {
    token = req.cookies['jwt']
  }
  return token
}

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: jwtConfig.secret,
}

const jwtLogin = new JwtStrategy(jwtOptions, async function (payload: any, done: any) {
  try {
    const user = await User.findOne({
      where: { id: payload.sub },
    })
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  } catch (err) {
    return done(err, false)
  }
})

export default jwtLogin
