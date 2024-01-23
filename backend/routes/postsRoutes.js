const express = require("express");
const router = express.Router();
const postControl = require('../controllers/postController')

// take all logic move to controller
// CRUD, client is requesting: all posts, ref individual comments

// seed
router.get("/seed", postControl.seed);

// ==INDEX== [http://localhost:8080/posts/] :: GET available: use model
router.get("/", postControl.index);

// ===CREATE== [http://localhost:8080/posts/] ::  POST available: req.body
router.post("/", postControl.create);

// ===DELETE== [http://localhost:8080/posts/:id] :: DELETE available: req.params.id
router.delete("/:id", postControl.delete);

// ===UPDATE=== [http://localhost:8080/posts/:id] :: PUT available: req.params.id, req.body
router.put("/:id", postControl.update);

// ===SHOW=== [http://localhost:8080/posts/:id] :: GET available: req.params.id
router.get('/:id', postControl.show)

module.exports = router;

// SHOW and EDIT are not necessary for client side
// as they would be handled in the app as a component
