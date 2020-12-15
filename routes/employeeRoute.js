var express = require('express');
var router = express.Router();

const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.showEmployeeList);
router.get('/edit/:empId', employeeController.showEmployeeEdit);
router.get('/details/:empId', employeeController.showEmployeeDetails);
router.get('/assign', employeeController.showEmployeeAssign);
router.get('/delete/:empId', employeeController.deleteEmployee);
router.post('/doedit', employeeController.updateEmployee);

module.exports = router;

