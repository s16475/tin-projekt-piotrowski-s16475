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

//teraz employee edit


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
    res.render('pages/employee/assign', { navLocation: 'emp' });
}

exports.deleteEmployee = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.deleteEmployee(empId)
    .then( () => {
        res.redirect('/employees');
    });
};