exports.showPolicyList = (req, res, next) => {
    res.render('pages/policy/list', { navLocation: 'policy' });
}

exports.showPolicyDetails = (req, res, next) => {
    res.render('pages/policy/details', { navLocation: 'policy' });
}