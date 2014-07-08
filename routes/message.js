
exports.fixedMessage = function(req, res){
    res.json({message: 'Un mensaje interesante'});
}

exports.list = function(req, res){
    // Que recorra todos los mensajes de la base de datos y los devuelva.
    var Message = req.schemas.Message;
    Message.find(function (err, messages) {
        if (err){
            throw err;
        } 
        res.json(messages);
    });
}


exports.create = function(req, res){
    var Message = req.schemas.Message;
    var texto = req.param('texto');
    var message = new Message({ texto: texto });
    message.save(function (err, data) {
        if (err){
            return console.error(err);  
        } 
        console.log('Mensage guardado');
    });
}


