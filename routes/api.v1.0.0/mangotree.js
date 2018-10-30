import express from 'express'

const router = express.Router()

/* GET ALL BOOKS */
router.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to the MangoTree API Of OpenBS!' })
//   BooksController.getAll()
//     .then(books => res.json({ success: true, data: books }))
//     .catch(error => res.json({ success: false, data: [] }))
})

// /* GET SINGLE BOOK BY ID */
// router.get('/:id', (req, res, next) => {
//   BooksController.getOne(req.params.id)
//     .then(book => res.json({ success: true, data: book }))
//     .catch(error => res.json({ success: false, data: [] }))
// });

// /* SAVE BOOK */
// router.post('', (req, res, next) => {
//   BooksController.create(req.body)
//     .then(book => res.json({ success: true, data: book }))
//     .catch(error => res.json({ success: false, data: [] }))
// });

// /* UPDATE BOOK */
// router.put('/:id', (req, res, next) => {
//   BooksController.update(req.params.id, req.body)
//   .then(book => res.json({ success: true, data: book }))
//   .catch(error => res.json({ success: false, data: [] }))
// });

// /* DELETE BOOK */
// router.delete('/:id', (req, res, next) => {
//   BooksController.delete(req.params.id, req.body)
//   .then(book => res.json({ success: true, data: book }))
//   .catch(error => res.json({ success: false, data: [] }))
// });

export default router
