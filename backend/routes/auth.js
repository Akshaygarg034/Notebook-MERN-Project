const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser')

router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'name must be minimum of 3 characters').isLength({ min: 3 }),
    body('password', 'password must be minimum of 5 characters').isLength({ min: 5 })
], async (req, res) => {

    // Hashing the password along with salt
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // This will throw an error if the name, email or password are not valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Creating a User and Adding its Data in the Database
    await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
    }).then(user => res.json(user)).catch((err) => {
        res.status(400).json({ Error: err.message })
    });
})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {

    // This will throw an error if the name, email or password are not valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid Credentials' })
        }

        // Comparing the password entered by the User with the Hashed password of the Database
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ error: 'Invalid Credentials' })
        }

        // Generating a Json Web Token of the required User ID
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, 'shhhhh');
        res.json(authtoken);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userID = req.user.id;
        // Finding user from the database and sending all its informations except password
        const user = await User.findById(userID).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})
module.exports = router