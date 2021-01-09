var express = require('express');
const AuthController = require('../controllers/authController');
const LangController = require('../controllers/LangController');

var router = express.Router();

/* GET home page*/ 
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main' });
});

router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/changeLang/:lang', LangController.changeLang);

module.exports = router;
