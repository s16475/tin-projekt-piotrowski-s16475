exports.showEmployeeList = (req, res, next) => {
    res.render('pages/employee/list', { navLocation: 'emp' });
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