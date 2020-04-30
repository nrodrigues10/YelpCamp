var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1528433556524-74e7e3bfa599?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Sit amet dictum sit amet justo. Nulla aliquet enim tortor at auctor urna nunc. Ultrices tincidunt arcu non sodales neque sodales ut."
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1520732713659-8f14034ba7d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Sit amet dictum sit amet justo. Nulla aliquet enim tortor at auctor urna nunc. Ultrices tincidunt arcu non sodales neque sodales ut."
    },
    {
        name: "Freshly Fresh Campsite",
        image: "https://images.unsplash.com/photo-1489275449173-7c7fe1d26f54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Sit amet dictum sit amet justo. Nulla aliquet enim tortor at auctor urna nunc. Ultrices tincidunt arcu non sodales neque sodales ut."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        Comment.remove({}, function(err){
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great! But internet would be good to have.",
                                author: "Lucy"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    //Colts show campground.comments and .save w/ no capital C
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                    }
                                }
                        );                            
                    }
                });
            });
        });
    });
    
    //add a few comments
};

module.exports = seedDB;
