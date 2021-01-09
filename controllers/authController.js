const EmployeeRepository = require('../repository/mysql2/EmployeeRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    EmployeeRepository.getEmployeeByEmail(email)
        .then(emp => {

            if(!emp) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if(authUtil.comparePasswords(password, emp.pass) 
                === true) {
                req.session.loggedUser = emp;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}

//tutaj poprawic blad logowania gdy wpisuje sie puste wartosci
//oraz blad gdy wpisze sie nieprawidlowy e-mail