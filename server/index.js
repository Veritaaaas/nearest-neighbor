const express = require('express');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDe_-D5V_ilS9ejhdFVuM6WQPdCmQexZzw'
});
const cors = require('cors');
const app = express();

app.use(cors()); // Use cors middleware before your routes

app.get('/route', (req, res) => {
    const locations = req.query.locations.split('|');

    googleMapsClient.distanceMatrix({
        origins: locations,
        destinations: locations,
        mode: 'driving'
    }, (err, response) => {
        if (!err) {
            const distanceMatrix = response.json.rows.map(row => row.elements.map(element => element.distance.value));
            res.json(distanceMatrix);
        } else {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch data from Google Maps' });
        }
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});