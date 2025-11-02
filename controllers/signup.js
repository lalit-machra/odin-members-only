import { body, validationResult, matchedData } from "express-validator";
import { pool } from "../db/pool.js";
import bcrypt from "bcryptjs";

const strongPasswordRegex = /(?=(.*[A-Z]){1,})(?=(.*[!@#$&%^,.?;'":-=_+\*\/\(\)\{\}\[\]\\]){1,})(?=(.*[0-9]){1,})(?=(.*[a-z]){1,})/;

const validateInfo = [
  body("firstName").trim()
    .isLength({ max: 32 }).withMessage("First name can't be longer than 32 characters")
    .isLength({ min: 1 }).withMessage("First name can't be empty")
    .custom(value => !/\s/.test(value)).withMessage("Spaces are not allowed in first name"),
  body("lastName").trim()
    .isLength({ max: 32 }).withMessage("Last name can't be longer than 32 characters")
    .isLength({ min: 1 }).withMessage("Last name can't be empty")
    .custom(value => !/\s/.test(value)).withMessage("Spaces are not allowed in last name"),
  body("username").trim()
    .isLength({ min: 1 }).withMessage("Last name can't be empty")
    .custom(value => !/\s/.test(value)).withMessage("Spaces are not allowed in username"),
  body("password").trim()
    .isLength({ min: 8, max: 12 }).withMessage("Password should be 8 to 12 characters long")
    .custom(value => strongPasswordRegex.test(value))
    .withMessage("Password should contain atleast one capital letter, small letter, special character, digit"),
  body("confirmPassword").trim()
    .custom((value, { req }) => value === req.body.password).withMessage("Password and confirm password don't match")
];

const signupHandler = [
  validateInfo,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", { signupErr: errors.array() });
    }

    const { firstName, lastName, username, password } = matchedData(req);
    const admin = req.body.admin ? true : false;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(`
      INSERT INTO users(firstname, lastname, username, password, membership, admin) VALUES
      ($1, $2, $3, $4, $5, $6)
    `, [firstName, lastName, username, hashedPassword, false, admin]);
    
    res.send("response submitted");
}];

export { signupHandler };