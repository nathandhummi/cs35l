const Note = require('../models/notesModel')
const mongoose = require('mongoose')

//getting all the notes
const getNotes = async (req, res) => {
    const notes = await Note.find({}).sort({createdAt: -1})

    res.status(200).json(notes)
}

//get a single note
const getNote = async (req, res) => {
    const {id} = req.params
    //make sure that the node id is valid. if not throw an error.
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such note'})
        }    const note = await Note.findById(id)

    if(!note){
        return res.status(404).json({error: 'No such note'})
    }

    res.status(200).json(note)
}

//POST a new note
const createNote = async (req, res) => {
    const{title, description} = req.body
    try{
        const note = await Note.create({title, description})
        res.status(200).json(note)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE a note

//UPDATE a note


module.exports = {
    createNote,
    getNotes,
    getNote
}