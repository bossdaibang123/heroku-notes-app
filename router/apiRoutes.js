const router = require('express').Router()
const db = require('../db/data')


router.get('/notes', (req, res) => {
    db
        .getNotes()
        .then( (notes) => {
            return res.json(notes)
        })
        .catch(err => res.status(500).json(err))
})

router.post('/notes', (req, res) =>{
    db
        .addNode(req.body)
        .then( newNote => res.json(newNote))
        .catch(err => res.status(500).json(err))
})

router.delete('/notes/:id', (req, res) => {
    db
        .deleteNote(req.params.id)
        .then( () => res.json({ok: true}))
        .catch(err => res.status(500).json(err))
})



module.exports = router