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

tournamentRouter.get('/', (req, res) => {
    Tournament.find({}, (error, allTournament) => {
        res.render('tournament/index.ejs', {
            tournament: allTournament,
        })
    })
})

tournamentRouter.get('/:id', (req, res) => {
    Tournament.findById(req.params.id, (err, foundTournament) => {
		res.render('tournament/show.ejs', {
            tournament: foundTournament,
        })
	})
})

module.exports = tournamentRouter;