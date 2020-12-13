const ClaimRepository = require('../repository/mysql2/ClaimRepository');

exports.getClaims = (req, res, next) => {
    ClaimRepository.getClaims()
        .then(claims => {
            res.status(200).json(claims);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getClaimById = (req, res, next) => {
    const claimId = req.params.claimId;
    ClaimRepository.getClaimById(claimId)
        .then(claim => {
            if(!claim) {
                res.status(404).json({
                    message: 'Claim with id: '+claimId+' not found'
                })
            } else {
                res.status(200).json(claim);
            }
        });
};

exports.createClaim = (req, res, next) => {
    ClaimRepository.createClaim(req.body)
        .then(newObj => {
           res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateClaim = (req, res, next) => {
    const claimId = req.params.claimId;
    ClaimRepository.updateClaim(claimId, req.body)
        .then(result => {
           res.status(200).json({message: 'Claim updated!', claim: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteClaim = (req, res, next) => {
    const claimId = req.params.claimId;
    ClaimRepository.deleteClaim(claimId)
        .then(result => {
            res.status(200).json({message: 'Removed claim', claim: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

