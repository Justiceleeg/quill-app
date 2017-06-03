const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , config = require('./config')
//Need to enter username and password for your database
const port = 4201;
var connString = config.databaseLocation ;

var app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: false,
	resave: false
}))
app.use(passport.initialize()); // MUST BE IN THIS ORDER INTIALIZE THEN SESSION
app.use(passport.session());

app.use(express.static('__dirname'+'./src'));

var db = massive.connectSync({connectionString : connString});
// initializing all sql tables
db.posts_create_seed(()=>{});
db.tags_create_seed(()=>{});
db.users_create_seed(()=>{});
app.set('db',db);

var controller = require('./controller');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
   domain:       config.domain,
   clientID:     config.clientID,
   clientSecret: config.clientSecret,
   callbackURL:  '/auth/callback'
 }, function(accessToken, refreshToken, extraParams, profile, done){
   //Find user in database
   db.getUserByAuthEmail([profile.emails[0].value], function(err, user) {
     user = user[0];
     if (!user) { //if there isn't one, we'll create one!
       console.log('CREATING USER');
       db.createUserByAuth([profile.displayName, profile.emails[0].value], function(err, user) {
         console.log('USER CREATED', user);
         return done(err, user[0]); // GOES TO SERIALIZE USER
       })
     } else { //when we find the user, return it
       console.log('FOUND USER', user);
       return done(err, user);
     }
   })
 }));

app.get('/auth', passport.authenticate('auth0')); //START

// AUTH0 RETURNS HERE
app.get('/auth/callback', // this must match the callbackURL in above
  passport.authenticate('auth0', {
    successRedirect: 'http://localhost:4200/write/'
  , failureRedirect: 'http://localhost:4200/'})
  , function (req,res) {
    if (!req.user) {
      throw new Error('user null')
    }
    res.status(200).send(req.user)
  });

passport.serializeUser(function(user, done) { //encode
  return done(null, user);
});
passport.deserializeUser(function(obj, done) {//decode
  // What do we want to put on req.user ??
  // obj is the profile object full of user info
  return done(null, obj);
})

app.get('/me', function(req,res){
  res.send( req.user )
})



app.listen(port, function(){
  console.log("Successfully listening on :",port)
})
