const { body, validationResult } = require('express-validator');

module.exports.validateContact = [
    body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required.')
    .isAlpha().withMessage('First name must contain only letters.'),

  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required.')
    .isAlpha().withMessage('Last name must contain only letters.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email address.'),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric().withMessage('Phone must contain only numbers.'),
];