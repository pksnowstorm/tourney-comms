const express = require('express');
const tournamentRouter = express.Router();
const Tournament = require('../models/tournament.js');

// New (Registration page)
tournamentRouter.get('/new', (req, res) => {
	res.render('tournament/new.ejs', {
		currentTournament: req.session.currentTournament
	});
});

tournamentRouter.post('/', (req, res) => {
    Tournament.create(req.body, (error, createdTournament) => {
        res.redirect('/');
    });
});

module.exports = tournamentRouter;