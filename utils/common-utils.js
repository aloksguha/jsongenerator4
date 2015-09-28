/**
 * Created by aguha on 20-11-2014.
 */

(function () {
    var _api ={
        isEmpty: function (obj) {
            return Object.keys(obj).length === 0;
        },

        isEqualStringIgnoreCase : function(string1, string2){
            if(string1 && string2){
                return string1.toUpperCase() === string2.toUpperCase();
            }else{
                return false;
            }

        },

        isInt: function(value) {
              return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
         },

        generateRandomString : function(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
        },

        getRandomArbitrary : function(min, max) {
            return Math.random() * (max - min) + min;
        },

        getRandomInt : function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }




    module.exports = {
        isEmpty: _api.isEmpty,
        isInt: _api.isInt,
        generateRandomString: _api.generateRandomString,
        isEqualStringIgnoreCase : _api.isEqualStringIgnoreCase,
        getRandomArbitrary : _api.getRandomArbitrary,
        getRandomInt : _api.getRandomInt
    };


}).call(this);

