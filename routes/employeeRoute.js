var express = require('express');
var router = express.Router();

const employeeControler = require('../controllers/employeeController');

router.get('/', employeeControler.showEmployeeList);
router.get('/edit', employeeControler.showEmployeeEdit);
router.get('/details/:empId', employeeControler.showEmployeeDetails);
router.get('/assign', employeeControler.showEmployeeAssign);

module.exports = router;

