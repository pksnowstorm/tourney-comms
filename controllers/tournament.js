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

//Index
tournamentRouter.get('/', async (req, res) => {
    await Tournament.find({}, (error, allTournament) => {
        res.render('tournament/index.ejs', {
            tournament: allTournament,
            currentUser: req.session.currentUser
        })
    })
})

//Edit
tournamentRouter.get('/:id/edit', async (req, res) => {
    await Tournament.findById(req.params.id, (err, foundTournament) => {
		res.render('tournament/edit.ejs', {
            tournament: foundTournament,
            currentUser: req.session.currentUser,
        })
	})
})


//Delete
tournamentRouter.delete('/:id', async (req, res) => {
    await Tournament.findByIdAndRemove(req.params.id)
    res.redirect('/')
})

//Update
tournamentRouter.put('/:id', async (req, res) => {
    if (req.body.openToPublic === 'on') {
		req.body.openToPublic = true;
	} else {
		req.body.openToPublic = false;
	}
    await Tournament.findByIdAndUpdate(req.params.id, req.body,
        {
          new: true,
        },
        (error, updatedTournament) => {
            res.redirect(`/tournament/${req.params.id}`)
        }
    )
})

//Create
tournamentRouter.post('/', (req, res) => {
    if (req.body.openToPublic === 'on') {
        req.body.openToPublic = true;
	} else {
		req.body.openToPublic = false;
	}
    Tournament.create(req.body, (error, createdTournament) => {
        res.redirect('/');
    });
});

//Show
tournamentRouter.get('/:id', (req, res) => {
    Tournament.findById(req.params.id, (err, foundTournament) => {
		res.render('tournament/show.ejs', {
            tournament: foundTournament,
            currentUser: req.session.currentUser,
        })
	})
})

module.exports = tournamentRouter;