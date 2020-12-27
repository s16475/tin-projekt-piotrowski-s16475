const db = require('../../config/mysql2/db');
const empSchema = require('../../model/joi/Employee');

exports.getEmployees = () => {
    
    return db.promise().query('SELECT * FROM Employee')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });

};

exports.getEmployeeById = (empId) => {

    const query = `SELECT e.empNo as empNo, e.firstName, e.lastName, e.email,
    cl_emp.workStartDate, cl_emp.workEndDate, 
    cl.claimNo as claimNo, cl.value FROM Employee e 
    left join Claim_Employee cl_emp on cl_emp.empNo = e.empNo
    left join Claim cl on cl_emp.claimNo = cl.claimNo 
    where e.empNo = ?`
    
    return db.promise().query(query, [empId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const emp = {
            empNo: parseInt(empId),
            firstName: firstRow.firstName,
            lastName: firstRow.lastName,
            email: firstRow.email,
            claims: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.claimNo) {
                const claim = {
                    claimNo: row.claimNo,
                    value: row.value,
                    workStartDate: row.workStartDate,
                    workEndDate: row.workEndDate
                };
                emp.claims.push(claim);
            }
        }
        return emp;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.updateEmployee = (empId, empData) => {

    const vRes = empSchema.validate(empData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }

    return checkEmailUnique(empData.email, empId)
        .then(emailErr => {
            if(emailErr.details) {
                return Promise.reject(emailErr);
            } else { 
                const sql = `UPDATE Employee set firstName = ?, lastName = ?, email = ? where empNo = ?`;
                const firstName = empData.firstName;
                const lastName = empData.lastName;
                const email = empData.email;
                return db.promise().execute(sql, [firstName, lastName, email, empId]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.deleteEmployee = (empId) => {

    const sql1 = 'DELETE FROM Claim_Employee where empNo = ?'
    const sql2 = 'DELETE FROM Employee where empNo = ?'

    return db.promise().execute(sql1, [empId])
    .then(() => {
        return db.promise().execute(sql2, [empId])
    });

};

exports.assignEmployee = (claimId, empId) => {

    const err_sql = 'SELECT COUNT(*) FROM Claim'

    if(claimId == -1 || empId == -1) {
        console.log('Nie wybrano żadnej poprawnej opcji')
        return db.promise().execute(err_sql);
    }

    let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate(),
    year = nowDate.getFullYear();

    if (month.length < 2)
    month = '0' + month;
    if (day.length < 2)
    day = '0' + day;
    const date = [year, month, day].join('-');

    const sql1 = 'INSERT into Claim_Employee (workStartDate, workEndDate, claimNo, empNo) VALUES (?, ?, ?, ?)'
    const sql2 = 'SELECT COUNT(*) AS c FROM Claim_Employee WHERE claimNo = ? AND empNo = ?'

    var count;

    return db.promise().execute(sql2, [claimId, empId])
        .then(result => {
            let data = result[0];
            count = data[0].c;
        }).then(() => {            
            if(count == 0) {
                return db.promise().execute(sql1, [date, null, claimId, empId]);
            } else {
                console.log('Ten pracownik jest już przypisany do tej szkody');
            }
        })
};

checkEmailUnique = (email, empId) => {
    let sql, promise;

    sql = `SELECT COUNT(1) as c FROM Employee where empNo != ? and email = ?`;
    promise = db.promise().query(sql, [empId, email]);
    
    return promise.then( (results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if(count > 0) {
            err = {
                details: [{
                    path: ['email'],
                    message: 'Podany adres email jest już używany'
                }]
            };
        }
        return err;
    });
}

//funkcja nieużywana
exports.createEmployee = (newEmpData) => {

    const firstName = newEmpData.firstName;
    const lastName = newEmpData.lastName;
    const email = newEmpData.email;
    const sql = 'INSERT into Employee (firstName, lastName, email) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [firstName, lastName, email]);
    //dodac insert w tabeli posredniczacej
    //plus jeszcze trzeba gdzies dodac przypisywanie pracownika do szkody
};