/* bringing in all of my required dependencies for my project */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const cumulusAPI = require('./services/cumulus-api');
const usersRouter = require('./routes/userRoutes');
const searchRouter = require('./routes/searchRoutes');

/* create a port that checks the process.env or defaults to 3000 */
const PORT = process.env.PORT || 3000;

/* start up express */
const app = express();

/* configure views */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* setting up a static path for my css styles */
app.use('/static', express.static(path.join(__dirname, 'static')));

/* set up logging */
app.use(logger('dev'));

/* in the event i needed the bodyParser package, i have my app.use here */
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

/* routes */
app.use('/users', usersRouter);
app.use('/cumulus-api', cumulusAPI);
app.use('/searches', searchRouter);

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
