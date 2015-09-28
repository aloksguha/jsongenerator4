/**
 * Created by aguha on 24-11-2014.
 */

var commonUtils = require('../../utils/common-utils');
module.exports = {
    generateString : function(configObject){
        var str = "";
        if(configObject){

            if(configObject.pattern  ){
                // pattern goes here

            }

            if(configObject.maxLength && commonUtils.isInt(configObject.maxLength)){
                str = commonUtils.generateRandomString(configObject.maxLength);
            }

            if(configObject.minLength && commonUtils.isInt(configObject.minLength)){
                str = commonUtils.generateRandomString(configObject.minLength + 2);
            }

            if(configObject.enum){
                var earr = configObject.enum;
                if(earr.length > 0 ){

                }
                str = earr[commonUtils.getRandomInt(0,earr.length-1)]
            }




        }
    return str;
}

}