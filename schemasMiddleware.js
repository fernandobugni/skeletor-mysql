

module.exports.inject = function(schemas){
    return function(req, res, next){
        req.schemas = schemas;
        next();
    };
}




