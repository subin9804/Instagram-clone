const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

// INDEX 
router.get('/', (req, res, next) => {
  res.json({ message: 'API Server - INDEX PAGE' })
});

/* 

  * HTTP Request Method *
  
  1 GET - Read data
  2 POST - Create data
  3 PUT - Update data
  4 DELETE - Delete data

*/

/* USERS */
router.post('/users', userController.register);
router.get('/users', userController.users);
router.post('/user/login', userController.login);

module.exports = router;
