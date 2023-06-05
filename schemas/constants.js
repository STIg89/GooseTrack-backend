const EMAIL_REGEXP = /(^[\w\.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})$/;
const PHONE_REGEXP = /(^\s*$)|(^\+|\d[\s\d\-\(\)]*\d$)/;
const PASSWORD_REGEXP = /([a-zA-z_\d]){6,}/; //^(?=.*[a-z_])(?=.*[A-Z_])(?=.*\d)[a-zA-Z_\d]{8,}$
const TIME_REGEXP = /^([01]\d|2[0-3]):([0-5]\d)$/;
module.exports = { EMAIL_REGEXP, PHONE_REGEXP, PASSWORD_REGEXP, TIME_REGEXP };
