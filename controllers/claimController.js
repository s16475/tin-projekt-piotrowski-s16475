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
    const claimId = req.params.claimId;
    ClaimRepository.getClaimById(claimId)
        .then(claim => {
            res.render('pages/claim/edit', {
                claim: claim,
                navLocation: 'claim'
            });
        });
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

exports.createClaim = (req, res, next) => {
    const claimData = { ...req.body }; 
    ClaimRepository.createClaim(claimData)
        .then( result => {
            res.redirect('/claims');
        });
}

exports.deleteClaim = (req, res, next) => {
    const claimId = req.params.claimId;
    ClaimRepository.deleteClaim(claimId)
    .then( () => {
        res.redirect('/claims');
    });
};

exports.updateClaim = (req, res, next) => {
    const claimId = req.body.claimNo;
    const claimData = { ...req.body };
    ClaimRepository.updateClaim(claimId, claimData)
    .then( result => {
        res.redirect('/claims');
    });
};


