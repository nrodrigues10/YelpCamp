var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("landing")
});

//INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("Error: " + err)
        } else {
            res.render("index", {campgrounds: allCampgrounds})
        }
    });
});

//CREATE - Add new campground to DB
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //create new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("Error: " + err);
        } else {
            //redirect back to campgrounds
            res.redirect("/campgrounds");
        }
    });
});

//NEW - Show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs")
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("Error: " + err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3002, function(){
    console.log("server listening")
});
