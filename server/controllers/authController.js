const db = require('../models/tripModel');
// import format from 'pg-format';
const bcrypt = require('bcryptjs');
const { useResolvedPath } = require('react-router');

const authController = {};

authController.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // check if username already exists
    const existingUserQuery = 'SELECT * FROM users WHERE username = $1';
    const existingUser = await db.query(existingUserQuery, [username]);

    if (existingUser.rows.length > 0) {
      return res.json({ message: 'Username already exists' });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // insert the new user into the database
    const insertUserQuery =
      'INSERT INTO users (username, password) VALUES ($1, $2)';
    await db.query(insertUserQuery, [username, hashedPassword]);

    return next();
  } catch (err) {
    return next({ log: `Error in registration: ${err}` });
  }
};

authController.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // retreive user from the db based on the username 
    const getUserQuery = 'SELECT * FROM users WHERE username = $1';
    const user = await db.query(getUserQuery, [username]);

    // check if the user exists 
    if (user.rows.length === 0) {
      return res.json({message: 'Invalid username or password'});
    } 

    // compare provided password with hashed password
    const hashedPassword = user.rows[0].password;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (isPasswordValid) {
      res.locals.message = 'Login successful';
      return next();
    } else {
      res.locals.message = 'Invalid username or password';
      return next();
    }
  } catch (err) {
    return next({ log: `Error in login ${err}`});
  }
};

module.exports = authController;
