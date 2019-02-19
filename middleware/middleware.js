const Campground = require('../models/Campground')
const Comment = require('../models/Comment')


const middleware = {}

middleware.isLoggedIn =   function (req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}


middleware.checkCampgrondOwnership = function (req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                res.redirect('/campgrounds')
            } else {
                if(foundCampground.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect('back')
                }
            }
        })
    } else {
        res.redirect('/campgrounds')
    }
}

middleware.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.commentId, (err, foundComment) => {
            if (err) {
                res.redirect('/campgrounds')
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect('back')
                }
            }
        })
    } else {
        res.redirect('back')
    }
}

module.exports = middleware; 