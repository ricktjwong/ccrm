import express from 'express'
let router = express.Router()

router.get('/', function (req: express.Request, res: express.Response) {
  res.render('index', { title: 'Express' })
})

module.exports = router
