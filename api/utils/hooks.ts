let bcrypt = require('bcrypt')

export function hashPassword (password: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(10, function (err: any, salt: string) {
      if (err) {
        reject(err)
      } else {
        bcrypt.hash(password, salt, function (err: any, hash: string) {
          if (err) {
            reject(err)
          } else {
            resolve(hash)
          }
        })
      }
    })
  })
}
