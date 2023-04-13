const express = require('express');
const tournamentRouter = express.Router();
const Tournament = require('../models/tournament.js');
const User = require('../models/user.js');

// New (Registration page)
tournamentRouter.get('/new', (req, res) => {
	res.render('tournament/new.ejs', {
		currentTournament: req.session.currentTournament,
        currentUser: req.session.currentUser
	});
});

tournamentRouter.post('/', (req, res) => {
    Tournament.create(req.body, (error, createdTournament) => {
        res.redirect('/');
    });
});

tournamentRouter.get('/', (req, res) => {
    Tournament.find({}, (error, allTournament) => {
        res.render('tournament/index.ejs', {
            tournament: allTournament,
            currentUser: req.session.currentUser
        })
    })
})

tournamentRouter.get('/:id', (req, res) => {
    Tournament.findById(req.params.id, (err, foundTournament) => {
		res.render('tournament/show.ejs', {
            tournament: foundTournament,
            currentUser: req.session.currentUser
        })
	})
})

module.exports = tournamentRouter;