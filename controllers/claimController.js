exports.showClaimList = (req, res, next) => {
    res.render('pages/claim/list', { navLocation: 'claim' });
}

exports.showClaimEdit = (req, res, next) => {
    res.render('pages/claim/edit', { navLocation: 'claim' });
}

exports.showClaimDetails = (req, res, next) => {
    res.render('pages/claim/details', { navLocation: 'claim' });
}

exports.showClaimAssign = (req, res, next) => {
    res.render('pages/claim/assign', { navLocation: 'claim' });
}

exports.showClaimAdd = (req, res, next) => {
    res.render('pages/claim/add', { navLocation: 'claim' });
}