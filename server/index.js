const express = require('express');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDe_-D5V_ilS9ejhdFVuM6WQPdCmQexZzw'
});
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/route', (req, res) => {
    // Get locations and weights from the query parameters
    const locations = req.query.locations.split('|');

    // Request distance matrix from Google Maps API
    googleMapsClient.distanceMatrix({
        origins: locations,
        destinations: locations,
        mode: 'driving'
    }, (err, response) => {
        if (!err) {
            // Parse the distance matrix
            const distanceMatrix = response.json.rows.map(row => row.elements.map(element => element.distance.value));
            
            // Send the distance matrix back to the client
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
