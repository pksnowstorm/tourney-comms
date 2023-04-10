require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
const session = require('express-session');
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL , {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));
app.use(methodOverride('_method'));
const userController = require('./controllers/users');
app.use('/users', userController);
const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);
app.get('/', (req, res) => {
	if (req.session.currentUser) {
		res.render('dashboard.ejs', {
			currentUser: req.session.currentUser
		});
	} else {
		res.render('index.ejs', {
			currentUser: req.session.currentUser
		});
	}
});
const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log('express is listening on:', PORT));