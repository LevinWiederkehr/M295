const express = require('express');
const app = express();
const port = 3000;
const url = 'https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=';

app.get('/temperatur/:plz', async (req, res) => {
    const plz = req.params.plz;

    if (!plz) {
        return res.status(400).json({ error: 'PLZ ist erforderlich' });
    }
    // const url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00`;

    try {
        const response = await fetch(url + plz + '00');
    
        if (!response.ok) {
            return res.status(response.status).send('Fehler bei MeteoSchweiz API');
        }

        const data = await response.json();

        res.json(data);
        
    } catch (error) {
        console.error('Fehler:', error);
        res.status(500).send('Netzwerkfehler');
    }        
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});