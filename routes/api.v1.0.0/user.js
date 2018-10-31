import express from 'express'
import UsersController from '../../controllers/UsersController'

const router = express.Router()

/* GET ALL users */
router.get('/', (req, res, next) => {
  UsersController.getAll()
    .then(users => res.json({ success: true, data: users }))
    .catch(_error => res.json({ success: false, data: [] }))
})

/* SAVE user */
router.post('/', (req, res, next) => {
  UsersController.create(req.body)
    .then(user => {
      return res.json({ success: true, data: user })
    })
    .catch(_error => {
      return res.json({ success: false, data: _error })
    })
})

/* GET SINGLE user BY ID */
router.get('/:id', (req, res, next) => {
  UsersController.getOne(req.params.id)
    .then(user => res.json({ success: true, data: user }))
    .catch(_error => res.json({ success: false, data: [] }))
})

/* UPDATE user */
router.put('/:id', (req, res, next) => {
  UsersController.update(req.params.id, req.body)
    .then(user => res.json({ success: true, data: user }))
    .catch(_error => res.json({ success: false, data: _error }))
})

/* DELETE user */
router.delete('/:id', (req, res, next) => {
  UsersController.delete(req.params.id, req.body)
    .then(user => res.json({ success: true, data: user }))
    .catch(_error => res.json({ success: false, data: _error }))
})

export default router
