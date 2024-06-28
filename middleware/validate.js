const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('firstName').isString().notEmpty().isLength({min: 8}).withMessage()('First name is required and should be a string, minimum of 8 caracters.'),
        body('lastName').isString().notEmpty().withMessage('Last name is required and should be a string'),
        body('email').isEmail().withMessage('Please provide a valid email address'),
        body('favoriteColor').isString().withMessage('Favorite color should be a string'),
        body('birthday').optional().isISO8601().withMessage('Birthday should be a valid date in ISO8601 format')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors
    });
};

module.exports = {
    userValidationRules,
    validate
};
