import express from 'express'
import MangoTreesController from '../../controllers/MangoTreesController'

const router = express.Router()

/* GET ALL mangos */
router.get('/', (req, res, next) => {
  MangoTreesController.getAll()
    .then(mangos => res.json({ success: true, data: mangos }))
    .catch(_error => res.json({ success: false, data: _error }))
})

/* SAVE mango */
router.post('/', (req, res, next) => {
  MangoTreesController.create(req.body)
    .then(mango => {
      return res.json({ success: true, data: mango })
    })
    .catch(_error => {
      return res.json({ success: false, data: _error })
    })
})

/* GET SINGLE mango BY ID */
router.get('/:id', (req, res, next) => {
  MangoTreesController.getOne(req.params.id)
    .then(mango => res.json({ success: true, data: mango }))
    .catch(_error => res.json({ success: false, data: _error }))
})

/* UPDATE mango */
router.put('/:id', (req, res, next) => {
  MangoTreesController.update(req.params.id, req.body)
    .then(mango => res.json({ success: true, data: mango }))
    .catch(_error => res.json({ success: false, data: _error }))
})

/* DELETE mango */
router.delete('/:id', (req, res, next) => {
  MangoTreesController.delete(req.params.id, req.body)
    .then(mango => res.json({ success: true, data: mango }))
    .catch(_error => res.json({ success: false, data: _error }))
})

/* BUY mango */
router.put('/buy/:id', (req, res, next) => {
  MangoTreesController.buyMangoTree(req.params.id, req.body)
    .then(mango => res.json({ success: true, data: mango }))
    .catch(_error => res.json({ success: false, data: _error }))
})

export default router
