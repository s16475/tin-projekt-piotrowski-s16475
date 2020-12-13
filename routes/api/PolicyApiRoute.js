const express = require('express');
const router = express.Router();

const policyApiController = require('../../api/PolicyAPI');

router.get('/', policyApiController.getPolicies);
router.get('/:policyId', policyApiController.getPolicyById);
router.post('/', policyApiController.createPolicy);
router.put('/:policyId', policyApiController.updatePolicy);
router.delete('/:policyId', policyApiController.deletePolicy);

module.exports = router;

