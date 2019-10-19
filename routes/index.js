const passport = require("../passport");
const routeHelper = require('./utils/routeHelper');
const db = require('../models');
const path = require("path");


module.exports = function(app) {
    
    app.get("/login", passport.authenticate('github'));
    app.get('/auth', passport.authenticate('github', {session: false, failureRedirect: routeHelper()}), function(req, res) {
        // Succesful authentication! 
        // Store the generated jwt in the client cookie
        res.cookie('jwt', req.user.jwtToken);
        
        res.redirect(routeHelper());
    });
    app.use(passport.initialize());

    
    app.get("/api/image", passport.authenticate('jwt', {session: false}), (req, res) => { 
        db.ImageStore.find({githubId: req.user.githubId})
        .then(function(images) {
            res.json(images);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.post("/api/image", passport.authenticate('jwt', {session: false}), (req, res) => {

        console.log(req.body);
        db.ImageStore.create({...req.body, githubId: req.user.githubId})
        .then(function(image) {
           
            db.User.findOneAndUpdate({githubId: req.user.githubId}, { $push: { images: image._id } }, { new: true })
            .then(function(user) {
                res.json(image);
            })
            .catch(function(err) {
                res.json(err);
            });
        
        })
        .catch(function(err) {
            res.json(err);
        });
        
    });

    // If no API routes are hit, send the React app
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
}