const db = require('../../config/mysql2/db');

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

exports.createEmployee = (newEmpData) => {

    const firstName = newEmpData.firstName;
    const lastName = newEmpData.lastName;
    const email = newEmpData.email;
    const sql = 'INSERT into Employee (firstName, lastName, email) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [firstName, lastName, email]);
    //dodac insert w tabeli posredniczacej
    //plus jeszcze trzeba gdzies dodac przypisywanie pracownika do szkody
};

exports.updateEmployee = (empId, empData) => {

    const firstName = empData.firstName;
    const lastName = empData.lastName;
    const email = empData.email;
    const sql = `UPDATE Employee set firstName = ?, lastName = ?, email = ? where empNo = ?`;
    return db.promise().execute(sql, [firstName, lastName, email, empId]);

};

exports.deleteEmployee = (empId) => {

    const sql1 = 'DELETE FROM Claim_Employee where empNo = ?'
    const sql2 = 'DELETE FROM Employee where empNo = ?'

    return db.promise().execute(sql1, [empId])
    .then(() => {
        return db.promise().execute(sql2, [empId])
    });

};


