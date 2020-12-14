var express = require('express');
var router = express.Router();

const employeeControler = require('../controllers/employeeController');

router.get('/', employeeControler.showEmployeeList);
router.get('/edit/:empId', employeeControler.showEmployeeEdit);
router.get('/details/:empId', employeeControler.showEmployeeDetails);
router.get('/assign', employeeControler.showEmployeeAssign);

router.get('/delete/:empId', employeeControler.deleteEmployee);

module.exports = router;

