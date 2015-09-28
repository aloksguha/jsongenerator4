/**
 * Created by aguha on 01-01-2015.
 */


var basicJSONGenerator = require('./json/basicJSONGenerator');

exports.generateEmptyJSONFromJSONSchema = function(JSONSchema){
    console.log("called.");
    var jsonData = basicJSONGenerator.generateEmptyJSON(JSONSchema);
    return jsonData;
}

