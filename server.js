const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4000;

const endpointsRouter = require('./api-routes/endpoint-routes');
const app = express();

const corsOptions = {
    origin: true,
    credentials: true
}
// start middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/entries', cors(corsOptions), endpointsRouter);

// errors
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(`Something went down: ${err}`)
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});