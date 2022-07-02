const express = require('express');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note')
const fetchuser = require('../middlewares/fetchuser');
const { getByTitle } = require('@testing-library/react');
const router = express.Router();

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.send(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }

})

router.post('/addnote', fetchuser, [
    body('title', 'title must be minimum of 5 characters').isLength({ min: 3 }),
    body('description', 'description must be minimum of 3 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        // This will throw an error if title or description is not valid
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const note = new Note({ title, description, tag, user: req.user.id });
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

module.exports = router