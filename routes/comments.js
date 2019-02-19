const express = require('express')
const router = express.Router({mergeParams: true})
const Campground = require('../models/Campground')
const Comment = require('../models/Comment')
const middleware = require('../middleware/middleware')

router.get('/new', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, found) => {
        res.render('comments/show', {campground: found})
    })
})

router.post('/', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            res.redirect('/campgrounds')
        } else {
            Comment.create(req.body.comment, (err, createdComment) => {
                if (err) {
                    res.redirect('/campgrounds')
                } else {
                    createdComment.author.id = req.user._id
                    createdComment.author.username = req.user.username
                    createdComment.save()
                    foundCampground.comments.push(createdComment)
                    foundCampground.save()
                    res.redirect('/campgrounds/' +  foundCampground.id)
                }
            })
        }
    })
})

router.get('/:commentId/edit', middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.commentId, (err, foundComment) => {
        
        res.render('comments/edit', {campgroundId: req.params.id, comment: foundComment})
    })
})

router.put('/:commentId', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, updatedComment) => {
        if(err) {
            res.redirect('/campgrounds')
        } else {
            res.redirect('/campgrounds/' + req.params.id)
        }
    })
})

router.delete('/:commentId', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.commentId, (err) => {
        if(err) {
            res.redirect('/campgrounds')
        } else {
            res.redirect('/campgrounds/'+ req.params.id)
        }
    })
})



module.exports = router; 
