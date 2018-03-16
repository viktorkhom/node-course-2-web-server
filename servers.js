const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {

	return new Date().getFullYear();

});

hbs.registerHelper('screamIt', (text) => {

	return text.toUpperCase();

});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
	
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Toby Pizda');
		}
	});
	next();

});

app.use(express.static(__dirname + '/public' ));

app.get('/home', (req, res) => {

	/*res.send('<h1> hello express! <h1 />');*/

	res.render('home.hbs',{
		pageTitle:"About page",
		welcomeMessage:'Welcome message',
		currentYear:new Date().getFullYear()
	})

});

app.get('/about', (req, res) => {

	res.render('about.hbs', {

		pageTitle:"About page",
		welcomeMessage:'About message',
		currentYear:new Date().getFullYear()

	});

});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});