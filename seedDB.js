const mongoose = require('mongoose');
const Campground = require('./models/Campground')
const Comment = require('./models/Comment')

const description = 'Integer arcu tortor, egestas et nulla vitae, hendrerit faucibus nunc. Sed maximus et quam sed cursus. Phasellus ullamcorper at nulla quis vulputate. Proin malesuada felis at nibh cursus egestas. Mauris porta laoreet odio in vulputate. Duis egestas sapien id leo blandit gravida. Vestibulum commodo augue arcu, at consectetur nisl gravida nec. Donec a ultrices felis, id eleifend mauris. Proin mollis, purus at faucibus euismod, nulla sapien efficitur urna, et sodales ipsum urna vel sapien. Cras lacinia tortor id diam feugiat eleifend.In blandit vestibulum neque non venenatis. Quisque sodales risus justo, et consectetur diam pretium eu. Nam eget egestas lacus, sit amet accumsan metus. Ut sed lacus sed ante mattis pulvinar. Etiam at felis vel enim efficitur rutrum. Vestibulum pulvinar eget turpis sit amet aliquam. Duis eget dictum justo, nec mollis est. Aenean efficitur massa iaculis turpis dapibus, ut tincidunt ligula maximus. Nullam dolor lacus, tincidunt in condimentum nec, congue id ante.'

data = [
    {
        location: 'Zlatibor',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Jesen_na_Zlatiboru.jpg',
        description: description
    },
    {
        location: 'Tara',
        image: 'https://c1.staticflickr.com/6/5447/9432084201_c55e496045_b.jpg',
        description: description
    },
    {
        location: 'Durmitor',
        image: 'https://meanderbug.com/wp-content/uploads/2016/05/Durmitor-valley-1200x800.jpg',
        description: description
    },
    ]

function seedDB() {

    Campground.deleteMany({}, (err) => {
        if (err) {
            console.log(err)
        } else {
           data.forEach(seed => {
               Campground.create(seed, (err, campground) => {
                   if (err) {
                       console.log(err)
                   } else {
                       console.log('campground created')
                       Comment.create({
                           author: 'Benjamin',
                           text: 'this is is becoming worse, but i will endure and fight with all my strength!'
                       }, (err, comment) => {
                           if (err) {
                               console.log(err)
                           } else {
                               campground.comments.push(comment)
                               campground.save()
                               console.log('created new comment');
                           }
                       })

                   }
               })
           })
        }
    })

}


module.exports = seedDB; 