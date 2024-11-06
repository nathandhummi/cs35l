//we want to be able to access from server.js to thie file
const express = require('express')
const {createNote, getNotes, getNote

} = require('../controllers/noteControllers')

//get notesModel from models file
const Note = require('../models/notesModel')

const router = express.Router()

//getting all the notes
router.get('/', getNotes)

//get a single note
router.get('/:id', getNote)

//POST a new note
router.post('/', createNote)

//DELETE a note
router.delete('/:id', (req, res) => {
    res.json({'mssg': 'DELETE a new note'})
})

//UPDATE a note
router.patch('/:id', (req, res) => {
    res.json({'mssg': 'UPDATE a new note'})
})


module.exports = router