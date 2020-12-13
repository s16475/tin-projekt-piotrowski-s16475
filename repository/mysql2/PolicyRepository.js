const db = require('../../config/mysql2/db');

exports.getPolicies = () => {

    return db.promise().query('SELECT * FROM Policy')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });

};

exports.getPolicyById = (policyId) => {

    const query = `SELECT p.policyNo as policyNo, p.startDate, p.endDate, p.sumInsured, p.insurerId,
    cl.claimNo as claimNo, cl.date, cl.value, cl.cause FROM Policy p
    left join Claim cl on cl.policy = p.policyNo
    where p.policyNo = ?` 
    return db.promise().query(query, [policyId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }

        const policy = {            
            policyNo: parseInt(policyId),
            startDate: firstRow.startDate,
            endDate: firstRow.endDate,
            sumInsured: firstRow.sumInsured,
            insurerId: firstRow.insurerId,
            claims: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.claimNo) {
                const claim = {
                    claimNo: row.claimNo,
                    date: row.date,
                    value: row.value,
                    cause: row.cause
                };
                policy.claims.push(claim);
            }
        }
        return policy;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });

};

//bedzie nieuzywane
exports.createPolicy = (newPolicyData) => {

    const startDate = newPolicyData.startDate;
    const endDate = newPolicyData.endDate;
    const sumInsured = newPolicyData.sumInsured;
    const insurerId = newPolicyData.insurerId;
    const sql = 'INSERT into Policy (startDate, endDate, sumInsured, insurerId) VALUES (?, ?, ?, ?)'
    return db.promise().execute(sql, [startDate, endDate, sumInsured, insurerId]);

};

//bedzie nieuzywane
exports.updatePolicy = (policyId, policyData) => {

    const startDate = policyData.startDate;
    const endDate = policyData.endDate;
    const sumInsured = policyData.sumInsured;
    const insurerId = policyData.insurerId;
    const sql = `UPDATE Policy set startDate = ?, endDate = ?, sumInsured = ?, insurerId = ? where policyNo = ?`;
    return db.promise().execute(sql, [startDate, endDate, sumInsured, insurerId, policyId]);

};

//bedzie nieuzywane - bedzie numer policy w claim, ktorej nie ma
exports.deletePolicy = (policyId) => {

    const sql = 'DELETE FROM Policy where policyNo = ?'
    return db.promise().execute(sql, [policyId]);    

};



