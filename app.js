var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let spanishSpanish = [];
let spanishEnglish = [];

// TODO remove verbose (for long stack traces) when production ready
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./db/spanish.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the spanish database.');
});

function getSpanishSpanish() {
    let spanish = [];
    db.each("SELECT * FROM Spanish",
        (error, row) => {
            /*puts the db stuff into an array for easy use. It is in a db and not a array in the first place to make it easy
            * to add questions while letting javascript only wait for the array and not wait for a bulky database*/
            spanish.push(row.Spanish);

        });
    return spanish;
}

function getSpanishEnglish() {
    let spanish = [];
    db.each("SELECT * FROM Spanish",
        (error, row) => {
            /*puts the db stuff into an array for easy use. It is in a db and not a array in the first place to make it easy
            * to add questions while letting javascript only wait for the array and not wait for a bulky database*/
            spanish.push(row.English);
        });
    return spanish;
}

spanishSpanish = getSpanishSpanish();
spanishEnglish = getSpanishEnglish();
console.log(spanishSpanish);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Get the spanish question
app.get('/spanishSpanish', function (req, res) {
    var randInt = randomIntFromInterval(0, spanishSpanish.length - 1);
    res.json({question: spanishSpanish[randInt], answer: spanishEnglish[randInt]})
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
