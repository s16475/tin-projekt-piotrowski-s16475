const PolicyRepository = require('../repository/mysql2/PolicyRepository');

exports.showPolicyList = (req, res, next) => {
    PolicyRepository.getPolicies()
        .then(policies => {
            res.render('pages/policy/list', {
                policies: policies,
                navLocation: 'policy'
            });
        });
}

exports.showPolicyDetails = (req, res, next) => {
    const policyId = req.params.policyId;
    PolicyRepository.getPolicyById(policyId)
        .then(policy => {
            res.render('pages/policy/details', {
                policy: policy,
                navLocation: 'policy'
            });
        });
}