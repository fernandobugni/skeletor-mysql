var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// DB: prueba
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret'
});
//connection.connect();
//connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//  if (err) throw err;
//  console.log('The solution is: ', rows[0].solution);
//});
//connection.end();

// Middleware
var schemasMiddleware = require('./schemasMiddleware');
// Rutas
var indexRoute = require('./routes/index');
var messageRoute = require('./routes/message');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(schemasMiddleware.inject(schemas)); // Cosas que se inyectan en el request al procesar rutas.

if (app.get('env') === 'development'){
    app.use(function(req,res,next){
        //console.log("Los esquemas!");
        //console.log(req.schemas);
        next();
    })
}

// Las rutas de la aplicacion.
// El index
app.get('/', indexRoute.index);
// Los mensajes.
app.get('/api/fixedMessage', messageRoute.fixedMessage);
app.get('/api/messages', messageRoute.list); 
app.post('/api/message', messageRoute.create);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.set('port', process.env.PORT || 3000); 
app.listen(app.get('port'), function() { 
    console.log('Express server listening on port ' + app.get('port')); 
});


