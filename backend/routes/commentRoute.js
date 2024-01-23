const express = require('express')

const router = express.Router()

const commentControl = require('../controllers/commentController')

// index [http://localhost:8080/comments/:postId] postId used to populate with ref
// Post.findById(req.params.postId).populate("comments");
router.get('/:postId', commentControl.index)

// delete [http://localhost:8080/comments/:postId/:commentId]
router.delete('/:postId/:commentId', commentControl.delete)

// update
router.put('/:postId/:commentId', commentControl.update)

// create
router.post('/:postId', commentControl.create)

// edit 
router.get('/:postId/:commentId', commentControl.edit)


module.exports = router