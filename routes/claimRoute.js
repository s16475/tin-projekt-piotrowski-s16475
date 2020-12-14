var express = require('express');
var router = express.Router();

const claimController = require('../controllers/claimController');

router.get('/', claimController.showClaimList);
router.get('/edit/:claimId', claimController.showClaimEdit);
router.get('/details/:claimId', claimController.showClaimDetails);
router.get('/assign', claimController.showClaimAssign);
router.get('/add', claimController.showClaimAdd);

router.get('/delete/:claimId', claimController.deleteClaim);

module.exports = router;
