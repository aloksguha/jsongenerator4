
var express = require('express'),
    async = require("async"),
    bodyParser = require('body-parser'),
    commonUtils = require('./utils/common-utils'),
    basicJSONGenerator = require('./json/basicJSONGenerator');

    var app = express();
    app.use(bodyParser.json());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use('/lib', express.static(__dirname + '/lib'));
    app.set("port", process.env.PORT || 3000);



    app.get('/', function(req, res){
        res.sendFile('index.html', { root: __dirname });
    });

    app.post('/', function(req, res){
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log("==============================  Request starts from IP => "+ip+" ====================================");
    return async.waterfall([
        // GATE - 1 : checks about existence of JSON schema in body

        function(done){
            console.log(req.body);
            if(! commonUtils.isEmpty(req.body)){
                console.log("Gate 1 : superficial check done [✓]");
                return done(null);
            }
            else{
               res.jsonp({"error":"please supply valid json schema"});
        }
    },

    // GATE - 2 : checks about superficial required attributes of JSON schema in body
    function(done){
            var jsonSchema = req.body;
            if( (jsonSchema.required && jsonSchema.required.length > 0) ||
                commonUtils.isEqualStringIgnoreCase(jsonSchema.type, 'array')){
                console.log("Gate 2 : Schema contains 'required' non-empty array [✓]");
                return done(null);
            }
            else{
                res.jsonp({});
            }
        },


        // GATE - 3 : checks about superficial required attributes of JSON schema in body
        function(done){
            var jsonSchema = req.body;
            var queryParam = parseInt(req.query.n);
            var retArray = [];
            if(isNaN(queryParam) || queryParam <= 0){

            }else{
                console.log("Gate <optional> : Schema contains 'query param' non-empty object [✓] => "+queryParam);
                return done(null);
            }

           // if(jsonSchema.type){
                if(commonUtils.isEqualStringIgnoreCase(jsonSchema.type, 'array')){
                    var subSchema = jsonSchema.items;
                    if(subSchema.properties && ! commonUtils.isEmpty(subSchema.properties)){
                        console.log("Gate 3 : Schema contains 'properties' non-empty object [✓]");
                        var json = basicJSONGenerator.generateEmptyJSON(subSchema);
                        res.jsonp([json]);
                    }
                }
                else if(/*commonUtils.isEqualStringIgnoreCase(jsonSchema.type, 'object') &&*/ jsonSchema.properties && ! commonUtils.isEmpty(jsonSchema.properties)){
                    console.log("Gate 3 : Schema contains 'properties' non-empty object [✓]");
                    var json = basicJSONGenerator.generateEmptyJSON(jsonSchema);
                    if(jsonSchema.title){
                        var tempjson = {};
                        tempjson[jsonSchema.title] = json;
                        json = tempjson;
                    }
                    res.jsonp(json);
                }
//            }else if(jsonSchema.properties){
//                var json = basicJSONGenerator.generateEmptyJSON(jsonSchema);
//            }


            else{
                console.log("did nothing");

                res.jsonp({});
            }
        },

        // GATE 4 to genenrate an array of given length
        function(done){
            var jsonSchema = req.body;
            var queryParam = parseInt(req.query.n);
            var retArray = [];

            for(count =0; count < queryParam; count++){
                if(commonUtils.isEqualStringIgnoreCase(jsonSchema.type, 'array')){
                    var subSchema = jsonSchema.items;
                    if(subSchema.properties && ! commonUtils.isEmpty(subSchema.properties)){
                        console.log("Gate 3 : Schema contains 'properties' non-empty object [✓]");
                        var json = basicJSONGenerator.generateEmptyJSON(subSchema);
                        retArray.push([json]);
                    }
                }
                else if( jsonSchema.properties && ! commonUtils.isEmpty(jsonSchema.properties)){
                    console.log("Gate 3 : Schema contains 'properties' non-empty object [✓]");
                    var json = basicJSONGenerator.generateEmptyJSON(jsonSchema);
                    if(jsonSchema.title){
                        var tempjson = {};
                        tempjson[jsonSchema.title] = json;
                        json = tempjson;
                    }
                    retArray.push(json);
                }
            }
            res.jsonp(retArray)
        }

    ],
    //Last function to execute
        function(){
            console.log("===============  process ends initiated from ip => "+ip+" ===============================");
            console.log('Done.');
        }
    );
});

app.listen(app.get("port"), function(){
    console.log("Server started and listening at port "+app.get("port")+" [✓]");
});



