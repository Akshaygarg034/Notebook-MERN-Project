const express = require('express');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note')
const fetchuser = require('../middlewares/fetchuser');
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
    body('title', 'title must be minimum of 3 characters').isLength({ min: 3 }),
    body('description', 'description must be minimum of 5 characters').isLength({ min: 5 })
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

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    try {
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Not Found')
        }
        // Checks if the note User is same as the User of the token
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Not Found')
        }
        // Checks if the note User is same as the User of the token
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({
            Success: "Note has been deleted",
            note: note
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

module.exports = router