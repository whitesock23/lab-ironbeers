const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
const randomBeer = punkAPI.getRandom()

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); // to 
// app.use(express.static(join(__dirname, '/public')));

// Old Way
app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beersFromTheAPI => {
    res.render('beers', { beersFromTheAPI });
  });
});

// New Way
// app.get('/beers', async (req, res) => {
//   let beersFromTheAPI = await punkAPI.getBeers();
//   res.render('beers', { beersFromTheAPI });
// });

// Register the location for handlebars partials here:
// hbs.registerPartials(__dirname + "/views/partials");
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/random-beer', (req, res) => {
//   punkAPI.getRandom().then(randomBeers => {
//     res.render('random-beer', { randomBeers });
//   });
// });

app.get('/random-beer', async (req, res) => {
  let randomBeers = await punkAPI.getRandom();
  res.render('random-beer', { randomBeers });
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
