const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "string.email":
                err.message = `Pole powinno zawierać prawidłowy adres email`;
                break;
            case "date.base":
                err.message = `Pole powinno być datą w formacie YYYY-MM-DD`;
                break;
            case "date.max":
                err.message = `Data nie powinna być z przyszłości`;
                break;
            case "number.base":
                err.message = `Pole powinno być liczbą`;
                break;
            case "number.positive":
                err.message = `Pole powinno być liczbą dodatnią`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const claimAddSchema = Joi.object({
    date: Joi.date()
        .required()
        .max('now')
        .error(errMessages),
    value: Joi.number()
        .required()
        .positive()
        .error(errMessages),
    cause: Joi.string()  
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    policy: Joi.number()
        .required()
        .positive()
        .error(errMessages),
    emp: Joi.number()
        .required()
        .positive()
        .error(errMessages)
});

module.exports = claimAddSchema;