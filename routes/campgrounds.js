const express = require('express')
const router = express.Router()
const Campground = require('../models/Campground')
const middleware = require('../middleware/middleware')



router.get('/', (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.log(err)
        } else {
            res.render('campgrounds/campgrounds', {campgrounds: campgrounds})
        }
    })
})

router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
} )

router.post('/', middleware.isLoggedIn, (req, res) => {
    req.body.campground.author = {
        id: req.user._id,
        username: req.user.username
    }
     
    Campground.create(req.body.campground, (err, newCampground) => {
        if(err) {
            console.log(err)
        } else {
            res.redirect('/campgrounds')
        }
    })
    })

router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments').exec((err, found) => {
        res.render('campgrounds/show', {campground: found})
    }) })

  

router.get('/:id/edit', middleware.checkCampgrondOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, found) => {
            res.render('campgrounds/edit', {campground: found})
        })
})

router.put('/:id', middleware.checkCampgrondOwnership, (req, res) => {
        Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campgroundUpdated) => {
            if(err) {
                res.redirect('/campgrounds')
            } else {
                res.redirect('/campgrounds/' + req.params.id)
            }
        })
})

router.delete('/:id', middleware.checkCampgrondOwnership, (req, res) => {
        Campground.findByIdAndRemove(req.params.id, err => {
            if (err) {
                res.redirect('/campgrounds')
            } else {
                res.redirect('/campgrounds')
            }
        })
})


   

module.exports = router; 