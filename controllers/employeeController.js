const EmployeeRepository = require('../repository/mysql2/EmployeeRepository');

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
    res.render('pages/employee/edit', { navLocation: 'emp' });
}

exports.showEmployeeDetails = (req, res, next) => {
    res.render('pages/employee/details', { navLocation: 'emp' });
}

exports.showEmployeeAssign = (req, res, next) => {
    res.render('pages/employee/assign', { navLocation: 'emp' });
}