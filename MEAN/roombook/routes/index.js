var express = require('express');
var router = express.Router();

var isAuthenticated = function(req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport) {

	/* GET login page. */
	router.get('/', function(req, res) {
		// Display the Login page with any flash message, if any
		res.render('index', {
			message: req.flash('message')
		});
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash: true
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res) {
		res.render('register', {
			message: req.flash('message')
		});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res) {
		res.render('home', {
			user: req.user
		});
	});
	/* GET ROOM 2 */
	router.get('/room2', isAuthenticated, function(req, res) {
		res.render('room2', {
			user: req.user
		});
	});
	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	var WeeklySchedule = require('../models/week');
	//update Week
	router.post('/update', function(req, res) {

		var newWeek = new WeeklySchedule();
		newWeek.startDate = req.body.startDate;
		newWeek.roomid = req.body.roomid;
		newWeek.slots = req.body.slots;
		var upsertData = newWeek.toObject();

		// Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
		delete upsertData._id;
		
		WeeklySchedule.findOneAndUpdate({
			startDate: newWeek.startDate
		}, upsertData, {
			upsert: true
		}, function(err) {
			if (err) {
				console.log('Error in Saving week: ' + err);
				throw err;
			}
			res.json({
				message: 'Successfully saved'
			});
		});

	});
	router.get('/week', function(req, res) {
		var startDate = req.query.startDate;
		WeeklySchedule.find({
			"startDate": startDate
		}, function(err, week) {
			if (err) throw err;

			// object of all the users
			res.json(week);

		});
	});
	return router;
}