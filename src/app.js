import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import hbs from 'hbs';
import { getLatLong } from "./utils/getLatLong.js";
import { getWeather } from "./utils/getWeather.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Surajit',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Surajit',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    msg: 'My message',
    name: 'Surajit',
  });
})

app.get('/weather', async (req, res) => {
  const searchLocation = req.query.address;
  if(!searchLocation) {
    return res.send({
      error: 'You must provide an address!',
    });
  }
  const latLong = await getLatLong(searchLocation);
  if(latLong.error) {
    return res.send({
      error: latLong.error,
    });
  } else {
    const weather = await getWeather(latLong.latitude, latLong.longitude);
    if(weather.error) {
      return res.send({
        error: weather.error,
      });
    } else {
      return res.send({
        condition: weather,
        location: latLong.location,
        address: searchLocation,
      });
    }
  }
});

app.get('/help/*', (req, res) => {
  res.render('errorPage', {
    title: 'Error Page',
    errorMsg: 'Help articel not found!',
    name: 'Surajit',
  });
});

app.get('*', (req, res) => {
  res.render('errorPage', {
    title: 'Error Page',
    errorMsg: 'Page not found!',
    name: 'Surajit',
  });
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
