var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name:"Heaven Creek", image:"https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
    {name:"Blue Fish Lake", image:"https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
    {name:"Bear Beans Campsite", image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name:"Turtle Sky Hot Springs", image:"https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name:"Heaven Creek", image:"https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
    {name:"Blue Fish Lake", image:"https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
    {name:"Bear Beans Campsite", image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name:"Turtle Sky Hot Springs", image:"https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name:"Heaven Creek", image:"https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
    {name:"Blue Fish Lake", image:"https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
    {name:"Bear Beans Campsite", image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name:"Turtle Sky Hot Springs", image:"https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
];

app.get("/", function(req, res){
    res.render("landing")
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds})
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs")
});

app.listen(3002, function(){
    console.log("server listening")
});
