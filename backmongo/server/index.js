const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors());

const galerije = require('./routes/api/galerije')
const lokacije = require('./routes/api/lokacije')
const vrsteEventa = require('./routes/api/vrsteEventa')
const events = require('./routes/api/events')
const djela = require('./routes/api/djela')
const autori = require('./routes/api/autori')
const autorDjelo = require('./routes/api/autorDjelo')
const vrsteDjela = require('./routes/api/vrsteDjela')

app.use('/api/galerije', galerije);
app.use('/api/lokacije', lokacije);
app.use('/api/vrsteEventa', vrsteEventa);
app.use('/api/events', events);
app.use('/api/djela', djela);
app.use('/api/autori', autori);
app.use('/api/autorDjelo', autorDjelo);
app.use('/api/vrsteDjela', vrsteDjela);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log('Server started on port ' + port)});
