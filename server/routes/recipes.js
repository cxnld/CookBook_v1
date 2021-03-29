const router = require('express').Router()
const verify = require('./verifyToken')
const User = require('../model/User')

// Get user data
router.get('/', verify, (req, res) => {
    User.findById(
        req.user
    ).then(userData => 
        res.send(userData)
    )
})

// Create new recipe
router.post('/new', verify, (req, res) => {
    let recipe = {
        title: req.body.title,
        description: req.body.description,
        instructions: req.body.instructions,
        image: req.body.image
    }

    User.findByIdAndUpdate(
        req.user,
        { $push: { recipes: recipe}},
        { new: true }
    )
    .then(newDoc => res.send(newDoc)
    )
})

// Update an existing recipe
router.patch('/update', verify, (req, res) => {
    User.findOneAndUpdate(
        { "_id": req.user._id, "recipes._id": req.body._id },
        { "$set": {
            "recipes.$.title": req.body.title,
            "recipes.$.description": req.body.description,
            "recipes.$.instructions": req.body.instructions,
            "recipes.$.image": req.body.image
            }
        },
        { new: true }
    )
    .then(updatedDoc => res.send(updatedDoc)
    )
})

// Delete a recipe
router.delete('/', verify, (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        { $pull: { recipes: { _id: req.body._id }}},
        { new: true }
    )
    .then(e => res.send(e)  
    )
})

module.exports = router;