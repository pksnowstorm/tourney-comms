require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL , {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected'));
db.on('disconnected', () => console.log('mongod disconnected'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.get('/' , (req, res) => {
    res.send('Hello World!');
  });
  app.listen(PORT, () => console.log('express is listening on:', PORT));