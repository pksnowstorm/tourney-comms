const express = require('express');
const bcrypt = require('bcrypt');
const messageRouter = express.Router();
const User = require('../models/user.js');

messageRouter.get('/:id', (req, res) => {
	res.render('chat/show.ejs', {
        currentUser: req.session.currentUser,
    })
})

module.exports = messageRouter;