const express = require('express');
const router = express.Router();
const User = require('../models/NoteUser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser')

router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'name must be minimum of 3 characters').isLength({ min: 3 }),
    body('password', 'password must be minimum of 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    // This will throw an error if the name, email or password are not valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // Checks whether the user with this email exists already
    let findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
        return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
    }

    // Hashing the password along with salt
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);


    // Creating a User and Adding its Data in the Database
    success = true;
    await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
    }).then(user => res.json({ success, user }))
        .catch((err) => {
            res.status(400).json({ Error: err.message })
        });
})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {
    var success = false;
    // This will throw an error if the name, email or password are not valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: 'Invalid Credentials' })
        }

        // Comparing the password entered by the User with the Hashed password of the Database
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            success = false;
            return res.status(400).json({ success, error: 'Invalid Credentials' })
        }

        // Generating a Json Web Token of the required User ID
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, 'shhhhh');
        success = true;
        res.json({ success, authtoken });

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