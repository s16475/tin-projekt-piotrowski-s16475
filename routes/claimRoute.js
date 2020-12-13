var express = require('express');
var router = express.Router();

const claimController = require('../controllers/claimController');

router.get('/', claimController.showClaimList);
router.get('/edit', claimController.showClaimEdit);
router.get('/details/:clId', claimController.showClaimDetails);
router.get('/assign', claimController.showClaimAssign);
router.get('/add', claimController.showClaimAdd);

module.exports = router;
