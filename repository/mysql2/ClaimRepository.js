const db = require('../../config/mysql2/db');

exports.getClaims = () => {

    return db.promise().query('SELECT * FROM Claim')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });

};

exports.getClaimById = (claimId) => {

    const query = `SELECT c.claimNo as claimNo, c.date, c.value, c.cause,
    cl_emp.workStartDate, cl_emp.workEndDate, 
    emp.empNo as empNo, emp.firstName, emp.lastName FROM Claim c
    left join Claim_Employee cl_emp on cl_emp.claimNo = c.claimNo
    left join Employee emp on emp.empNo = cl_emp.empNo 
    where c.claimNo = ?;`
    
    return db.promise().query(query, [claimId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const claim = {
            claimNo: parseInt(claimId),
            date: firstRow.date,
            value: firstRow.value,
            cause: firstRow.cause,
            employees: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.claimNo) {
                const employee = {
                    empNo: row.empNo,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    workStartDate: row.workStartDate,
                    workEndDate: row.workEndDate        //tutaj wchodzi null i nie dziala, co zrobic? //tak samo getEmp By Id //to naprawic
                };
                claim.employees.push(employee);
            }
        }
        return claim;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};



/*
exports.getClaimById = (claimId) => {

    const query = `SELECT c.claimNo as claimNo, c.date, c.value, c.cause,
    cl_emp.workStartDate, cl_emp.workEndDate, 
    emp.empNo as empNo, emp.firstName, emp.lastName FROM Claim c
    left join Claim_Employee cl_emp on cl_emp.claimNo = c.claimNo
    left join Employee emp on emp.empNo = cl_emp.empNo 
    where c.claimNo = ?;`
    
    return db.promise().query(query, [claimId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const claim = {
            claimNo: parseInt(claimId),
            date: firstRow.date,
            value: firstRow.value,
            cause: firstRow.cause,
            employees: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];

            console.log(row.workEndDate);
            var check = row.workEndDate;
            console.log(check);

            var employee;
            if(row.claimNo) {
                if(check) {
                    //od strony bd dziala
                    //sprawdzic czy workEndDate jest null

                    employee = {
                        empNo: row.empNo,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        workStartDate: row.workStartDate,
                        workEndDate: row.workEndDate                   
                    }
                    console.log(employee);
                } else {
                    employee = {
                        empNo: row.empNo,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        workStartDate: row.workStartDate,
                        workEndDate: null
                    } 
                    console.log(employee);   
                };
                claim.employees.push(employee);
            }
        }
        return claim;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};
*/


exports.createClaim = (newClaimData) => {
    
    const date = newClaimData.date;
    const value = newClaimData.value;
    const cause = newClaimData.cause;
    const policy = newClaimData.policy; 
    const emp = newClaimData.emp;

    //const endDate = '0001-01-01';
    
    const sql1 = 'INSERT into Claim (date, value, cause, policy) VALUES (?, ?, ?, ?)'
    const sql2 = 'INSERT into Claim_Employee (workStartDate, workEndDate, claimNo, empNo) VALUES (?, ?, ?, ?)'
    const sql3 = 'SELECT COUNT(*) AS c FROM Claim' 

    var count;

    return db.promise().execute(sql1, [date, value, cause, policy])
        .then(() => {
            return db.promise().execute(sql3)
                .then(result => {
                    let data = result[0];
                    count = data[0].c;
                }).then(() => {
                    return db.promise().execute(sql2, [date, null, count, emp])  //endDate
        })
    })
};



exports.updateClaim = (claimId, claimData) => {
    const date = claimData.date;
    const value = claimData.value;
    const cause = claimData.cause;    
    const sql = `UPDATE Claim set date = ?, value = ?, cause = ? where claimNo = ?`;
    return db.promise().execute(sql, [date, value, cause, claimId]);

};

exports.deleteClaim = (claimId) => {

    const sql1 = 'DELETE FROM Claim_Employee where claimNo = ?'
    const sql2 = 'DELETE FROM Claim where claimNo = ?'

    return db.promise().execute(sql1, [claimId])
        .then(() => {
            return db.promise().execute(sql2, [claimId])

        });
};
