const express = require('express');
const cors = require('cors'); 
const app = express();         
const port = 3000;  
app.use(cors());                      
app.use(express.json());
const galerijeRouter = require('./galerije');
const lokacijeRouter = require('./lokacije');
const eventiRouter = require('./eventi');
const vrsteRouter = require('./vrste');

app.use('/galerije', galerijeRouter);
app.use('/lokacije', lokacijeRouter);
app.use('/eventi', eventiRouter);
app.use('/vrste', vrsteRouter);       

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});