const ClaimRepository = require('../repository/mysql2/ClaimRepository');

exports.showClaimList = (req, res, next) => {
    ClaimRepository.getClaims()
        .then(claims => {
            res.render('pages/claim/list', {
                claims: claims,
                navLocation: 'claim'
            });
        });
}

exports.showClaimEdit = (req, res, next) => {
    res.render('pages/claim/edit', { navLocation: 'claim' });
}

exports.showClaimDetails = (req, res, next) => {
    const claimId = req.params.claimId;
    ClaimRepository.getClaimById(claimId)
        .then(claim => {
            res.render('pages/claim/details', {
                claim: claim,
                navLocation: 'claim'
            });
        });
}

exports.showClaimAssign = (req, res, next) => {
    res.render('pages/claim/assign', { navLocation: 'claim' });
}

exports.showClaimAdd = (req, res, next) => {
    res.render('pages/claim/add', { navLocation: 'claim' });
}