const Joi = require('joi');

// Schéma de ce qui est attendu au niveau du formulaire d'inscription
const schemaUserInput = Joi.object({
    email:Joi.string().email().required(),
    firstname:Joi.string().pattern(new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$")).required(),
    lastname:Joi.string().pattern(new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$")).required(),
    password:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')).required(),
    confirmation:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')).required(),
    birthdate:Joi.number().integer().min(1900).max(2005).required()
});

module.exports = {
  checkSignUpData(req,res,next){
    let { error } = schemaUserInput.validate(req.body);
    if(!error){
        next();
    }
    else{
        console.log(error)
        res.status(400).json(error)
    }
},
}