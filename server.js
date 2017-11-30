/* Required resources always go first */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const cumulusAPI = require('./cumulus-api');

/* create a PORT that checks the process.env or defaults to 3000 */
const PORT = process.env.PORT || 3000;

/* Start up express */
const app = express();

/* configure views */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* set up logging */
app.use(logger('dev'));

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

/* ROUTES */

app.use('./cumulus-api', cumulusAPI);

/*
  HOME route
*/
app.get('/', (req, res) => {
  res.render('index', {
    message:
    'cumulus',
    documentTitle:
    'welcome to cumulus',
    subTitle:
    'a cloud news site',
    showMore:
    false,
  });
});

app.listen(PORT, () => {
  console.log('Server up, super chilled, and listening to Andre-3000');
});
