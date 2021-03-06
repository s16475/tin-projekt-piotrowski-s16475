const ClaimRepository = require('../repository/mysql2/ClaimRepository');
const EmployeeRepository = require('../repository/mysql2/EmployeeRepository');

exports.showClaimList = (req, res, next) => {

    const param = req.query.param;

    ClaimRepository.getClaims()
        .then(claims => {
            res.render('pages/claim/list', {
                claims: claims,
                navLocation: 'claim',
                claimModified: param
            });
        });
}

exports.showClaimEdit = (req, res, next) => {
    const claimId = req.params.claimId;
    ClaimRepository.getClaimById(claimId)
        .then(claim => {
            res.render('pages/claim/edit', {
                claim: claim,
                navLocation: 'claim',
                validationErrors: null
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
    let allClaims, allEmps;
    ClaimRepository.getClaims()
        .then(claims => {
            allClaims = claims;
            return EmployeeRepository.getEmployees();
        })
        .then(emps => {
            allEmps = emps;
            res.render('pages/claim/assign', {
                claims: allClaims,
                emps: allEmps,
                navLocation: 'claim'
            });
        });
}

exports.assignClaim = (req, res, next) => {
    const claimId = req.body.select1;
    const empId = req.body.select2;
    ClaimRepository.assignClaim(claimId, empId)  
    .then( () => {
        res.redirect('/claims/?param=assign');
    });
}

exports.showClaimAdd = (req, res, next) => {
    res.render('pages/claim/add', { 
        navLocation: 'claim',
        validationErrors: null
    });
}

exports.createClaim = (req, res, next) => {
    const claimData = { ...req.body }; 
    ClaimRepository.createClaim(claimData)
        .then( result => {
            res.redirect('/claims/?param=add');
        })
        .catch(err => {            
            res.render('pages/claim/add', { 
                navLocation: 'claim',
                validationErrors: err.details
            });
        })
}

exports.deleteClaim = (req, res, next) => {
    const claimId = req.params.claimId;
    ClaimRepository.deleteClaim(claimId)
    .then( () => {
        res.redirect('/claims/?param=del');
    });
}

exports.updateClaim = (req, res, next) => {
    const claimId = req.body.claimNo;
    const claimData = { ...req.body };
    ClaimRepository.updateClaim(claimId, claimData)
    .then( result => {
        res.redirect('/claims/?param=true');
    })
    .catch(err => {
        res.render('pages/claim/edit', {
            claim: claimData,
            navLocation: 'claim',
            validationErrors: err.details
        });
    });
}



