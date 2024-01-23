const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = { id: user._id, username: user.username };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 300 });
  return token;
}

async function register(req, res) {
  try {
    // 1 check if user exists
    // Model.findOne({key: 'value/response from form'})
    const foundUser = await User.findOne({ username: req.body.username });

    if (foundUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // 2 if they don't (its a new user), send to register and !! encrypt password !!
    // npm i bcrypt (for encryption)
    // hashing is an algorithm that generates a random string when you give it a string
    // hash (this, scramble this many times(salt rounds, some hide this in an .env))
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(encryptedPassword);

    // 3 add a new user to DB (with encrypted pw)
    // keep username, keep email, change pw to encrypted pw
    console.log({ ...req.body, password: encryptedPassword });
    const newUser = await User.create({
      ...req.body,
      password: encryptedPassword,
    });

    console.log(newUser);

    // 4 give key to access (authorization), generate JWT token and return to user
    // npm i jsonwebtoken
    // our sent payload is {id: id from mongodb, username: from the newUser}
    // const payload = { id: newUser._id, username: newUser.username };

    // jwt.sign(requires a Payload, Secret String(hide in env), options(commonly put in an expiration))
    // jwt is scynorus so we don't need to await
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 30 });
    // console.log(token);
    // res.status(200).json({ token });

    const token = generateToken(newUser);

    console.log(token);
    res.status(200).json({ token });
    
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    // 1 check if user exists, set the username as the reference for the next steps.
    const foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      return res.status(400).json({ error: "No such user exists" });
    }

    // 2 check if PW provided by user matches DB
    // compare(password typed in, database password) this will return a boolean value
    const validPass = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!validPass) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 3 if pw matches, generate token and return to user
    const token = generateToken(foundUser);
    res.status(200).json({ token });

  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
}
// after this we hit middleware authMiddleware
module.exports = {
  register,
  login,
};