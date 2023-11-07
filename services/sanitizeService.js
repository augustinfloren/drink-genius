const { validationResult, body } = require('express-validator');

const sanitize = [
    // NEW COCTAIL FORM
    body('name').trim().escape(),
    body('instruction').trim().escape(),

    // PROFILE FORM
    body('firstname').trim().escape(),
    body('lastname').trim().escape(),
    body('birthdate').trim().escape(),
    body('email').trim().escape(),
    body('location').trim().escape(),
    body('hobbies').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log('Erreur lors du sanitize.')
        }
        next();
    },
]

module.exports = sanitize;