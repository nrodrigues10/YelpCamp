var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    localStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds")

//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")

mongoose.connect("mongodb://localhost/yelp_camp_v7", {
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
app.use(express.static(__dirname + "/public"));
seedDB();

//PASSWORD CONFIG
app.use(require("express-session")({
    secret:"I will be a great developer!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3002, function(){
    console.log("server listening")
});
