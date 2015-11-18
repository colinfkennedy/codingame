/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var MESSAGE = readline();
var PADDING = "0000000"

var Convert = {
    toBin: function(ch){
        var compact = ch.charCodeAt(0).toString(2);
        return PADDING.substring(0, PADDING.length - compact.length) + compact
    },

    toUnary: function(binary) {
        return 0;
    }
};
var binaryMessage = '';
for (var i = 0; i < MESSAGE.length; i++){
    var character = MESSAGE.charAt(i);
    printErr("Converting char: " + character);
    var binaryChar = Convert.toBin(character);
    printErr("binary char:" + binaryChar);
    binaryMessage += binaryChar;
}
var unaryMessage;
var last;
for(var i=0; i< binaryMessage.length; i++){
    var current = binaryMessage.charAt(i);
    if(i === 0){
        unaryMessage = current === "1" ? "0 0" : "00 0";
    } else if(current === last){
        unaryMessage += "0";
    } else {
        var onezero = current === "1" ? "0 0" : "00 0";
        unaryMessage += " " + onezero
    }
    last = current;
}

printErr(binaryMessage);

printErr(unaryMessage);

// Write an action using print()
// To debug: printErr('Debug messages...');

print(unaryMessage);