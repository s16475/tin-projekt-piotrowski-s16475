const PolicyRepository = require('../repository/mysql2/PolicyRepository');

exports.getPolicies = (req, res, next) => {
    PolicyRepository.getPolicies()
        .then(pol => {
            res.status(200).json(pol);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getPolicyById = (req, res, next) => {
    const policyId = req.params.policyId;
    PolicyRepository.getPolicyById(policyId)
        .then(pol => {
            if(!pol) {
                res.status(404).json({
                    message: 'Policy with id: '+policyId+' not found'
                })
            } else {
                res.status(200).json(pol);
            }
        });
};

exports.createPolicy = (req, res, next) => {
    PolicyRepository.createPolicy(req.body)
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

exports.updatePolicy = (req, res, next) => {
    const policyId = req.params.policyId;
    PolicyRepository.updatePolicy(policyId, req.body)
        .then(result => {
           res.status(200).json({message: 'Policy updated!', pol: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deletePolicy = (req, res, next) => {
    const policyId = req.params.policyId;
    PolicyRepository.deletePolicy(policyId)
        .then(result => {
            res.status(200).json({message: 'Removed policy', pol: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
