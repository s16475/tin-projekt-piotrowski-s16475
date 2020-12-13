const express = require('express');
const router = express.Router();

const claimApiController = require('../../api/ClaimAPI');

router.get('/', claimApiController.getClaims);
router.get('/:claimId', claimApiController.getClaimById);
router.post('/', claimApiController.createClaim);
router.put('/:claimId', claimApiController.updateClaim);
router.delete('/:claimId', claimApiController.deleteClaim);

module.exports = router;

