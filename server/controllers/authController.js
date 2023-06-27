import db from '../models/tripModel';
import format from 'pg-format';
import bcrypt from 'bcryptjs';

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

    
  } catch (err) {

  }
}

module.exports = authController;
