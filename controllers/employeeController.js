const EmployeeRepository = require('../repository/mysql2/EmployeeRepository');
const ClaimRepository = require('../repository/mysql2/ClaimRepository');
const { empty } = require('../model/joi/Employee');

exports.showEmployeeList = (req, res, next) => {
    EmployeeRepository.getEmployees()
        .then(emps => {
            res.render('pages/employee/list', {
                emps: emps,
                navLocation: 'emp'
            });
        });
}

exports.showEmployeeEdit = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.getEmployeeById(empId)
        .then(emp => {
            res.render('pages/employee/edit', {
                emp: emp,
                navLocation: 'emp',
                validationErrors: null
            });
        });
}

exports.showEmployeeDetails = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.getEmployeeById(empId)
        .then(emp => {            
            res.render('pages/employee/details', {
                emp: emp,
                navLocation: 'emp'
            });
        });
}

exports.showEmployeeAssign = (req, res, next) => {
    let allClaims, allEmps;
    EmployeeRepository.getEmployees()
        .then(emps => {
            allEmps = emps;
            return ClaimRepository.getClaims();
        })
        .then(claims => {
            allClaims = claims;
            res.render('pages/employee/assign', {
                emps: allEmps,
                claims: allClaims,
                navLocation: 'emp'
            });
        });    
}

exports.assignEmployee = (req, res, next) => {

    const claimId = req.body.select1;
    const empId = req.body.select2;
    EmployeeRepository.assignEmployee(claimId, empId)  
    .then( result => {
        res.redirect('/employees');
    });
}

exports.deleteEmployee = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.deleteEmployee(empId)
    .then( () => {
        res.redirect('/employees');
    });
}

exports.updateEmployee = (req, res, next) => {
    const empId = req.body.empNo;
    const empData = { ...req.body };
    EmployeeRepository.updateEmployee(empId, empData)
    .then( result => {
        res.redirect('/employees');
    })
    .catch(err => {
        res.render('pages/employee/edit', {
            emp: empData,
            navLocation: 'emp',
            validationErrors: err.details
        });
    });
}

//uzupelnic pozostale walidacje dla employee, w edit.ejs