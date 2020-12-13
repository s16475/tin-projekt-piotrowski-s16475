var express = require('express');
var router = express.Router();

const policyController = require('../controllers/policyController');

router.get('/', policyController.showPolicyList);
router.get('/details/:policyId', policyController.showPolicyDetails);

module.exports = router;
