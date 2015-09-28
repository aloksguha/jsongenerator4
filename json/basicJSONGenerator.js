/**
 * Created by aguha on 20-11-2014.
 */
var commonUtil = require('../utils/common-utils');
var stringGenerator = require('./generators/String');
var IntegerGenerator = require('./generators/Integer');
var numberGenerator = require('./generators/Number');
var booleanGenerator = require('./generators/Boolean');
var arrayGenenraor = require('./generators/Arrays');

module.exports = {
    generateEmptyJSON: function (jsonSchema) {
        var requiredArray = jsonSchema.required;
        var propertiesObj = jsonSchema.properties;
        var jsonData = {};

        for(var i=0; i<requiredArray.length; i++){
            var attribute = requiredArray[i];
            console.log("processing for >>"+attribute);
            if(propertiesObj.hasOwnProperty(attribute)){
                if(commonUtil.isEqualStringIgnoreCase(propertiesObj[""+attribute+""].type,"string")){
                    jsonData[attribute] = stringGenerator.generateString(propertiesObj[""+attribute+""]);

                }
                else if(commonUtil.isEqualStringIgnoreCase(propertiesObj[""+attribute+""].type,"integer")){
                    jsonData[attribute] = IntegerGenerator.generateInteger (propertiesObj[""+attribute+""]);

                }
                else if(commonUtil.isEqualStringIgnoreCase(propertiesObj[""+attribute+""].type,"number")){
                    jsonData[attribute] = numberGenerator.generateNumber (propertiesObj[""+attribute+""]);

                }
                else if(commonUtil.isEqualStringIgnoreCase(propertiesObj[""+attribute+""].type,"boolean")){
                    jsonData[attribute] = booleanGenerator.generateBoolean (propertiesObj[""+attribute+""]);

                }
                else if(commonUtil.isEqualStringIgnoreCase(propertiesObj[""+attribute+""].type,"object")){
                    jsonData[attribute] = this.generateEmptyJSON(propertiesObj[""+attribute+""]);

                }
                else if(commonUtil.isEqualStringIgnoreCase(propertiesObj[""+attribute+""].type,"array")){
                    jsonData[attribute] = arrayGenenraor.generateArray(propertiesObj[""+attribute+""]);

                }
            }
        }

        return jsonData;
    }
};


