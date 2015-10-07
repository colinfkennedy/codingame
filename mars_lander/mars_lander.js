/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

Math.toDegrees = function(radians) {
  return radians * 180 / Math.PI;
};
var GRAVITY = 3.711;
var MAX_HORIZONTAL_SPEED = 20;
var MAX_VERTICAL_SPEED = 40;
var SPEED_MARGIN = 5;
var X;
var Y;
var hSpeed; // the horizontal speed (in m/s), can be negative.
var vSpeed; // the vertical speed (in m/s), can be negative.
var fuel; // the quantity of remaining fuel in liters.
var rotate; // the rotation angle in degrees (-90 to 90).
var power; // the thrust power (0 to 4).

var surfaceN = parseInt(readline()); // the number of points used to draw the surface of Mars.
var lastX = -1;
var lastY = -1;
var landingStartX = -1;
var landingEndX = -1;
var landingY = -1;
for (var i = 0; i < surfaceN; i++) {
    var inputs = readline().split(' ');
    var landX = parseInt(inputs[0]); // X coordinate of a surface point. (0 to 6999)
    var landY = parseInt(inputs[1]); // Y coordinate of a surface point. By linking all the points together in a sequential fashion, you form the surface of Mars.
    printErr("Land X: " + landX + " Land Y: " + landY);
    if(lastY === landY && landingStartX === -1){
        printErr("First two heights the same. Setting start point of landing to " + lastX);
        landingStartX = lastX;
        landingY = landY;
    } else if(landingStartX !== -1 && landingEndX === -1) {
        printErr("Heights not the same. And start point of landing is set. Setting end to: " + lastX);
        landingEndX = lastX;
    }
    lastX = landX;
    lastY = landY;
}

var speedWarningHeight = (1000 + landingY);
var criticalHeight = (200 + landingY);
printErr("Landing Start: " + landingStartX + " Landing Middle: " + landingMiddle + " Landing End: " + landingEndX);
printErr("Landing Height: " + landingY);
printErr("Critical Height: " + criticalHeight);

var landingMiddle = landingEndX - ((landingEndX - landingStartX)/2);

function hasSafeSpeed() {
    return Math.abs(hSpeed) <= MAX_HORIZONTAL_SPEED - SPEED_MARGIN && Math.abs(vSpeed) <= MAX_VERTICAL_SPEED - SPEED_MARGIN;
}

function isFinishing() {
    return Y < criticalHeight;
}

function isNotOverTarget() {
    return !(landingStartX <= X && X <= landingEndX);
}

function goesInWrongDirection() {
    return (X < landingStartX && hSpeed < 0) || (landingEndX < X && hSpeed > 0);
}

function goesTooFastHorizontally() {
    return Math.abs(hSpeed) > 4*MAX_HORIZONTAL_SPEED;
}

function goesTooSlowHorizontally() {
    return Math.abs(hSpeed) < 2*MAX_HORIZONTAL_SPEED;
}

function angleToSlow() {
    var speed = Math.sqrt(hSpeed*hSpeed + vSpeed*vSpeed);
    return Math.toDegrees(Math.asin(hSpeed / speed));
}

function angleToAimTarget() {
    var angle =Math.toDegrees(Math.acos(GRAVITY / 4.0));
    if (X < landingStartX)
        return -angle;
    else if (landingEndX < X)
        return angle;
    else
        return 0;
}

function powerToHover() {
    return (vSpeed >= 0) ? 3 : 4;
}
// game loop
while (true) {
    var inputs = readline().split(' ');
    X = parseInt(inputs[0]);
    Y = parseInt(inputs[1]);
    hSpeed = parseInt(inputs[2]); // the horizontal speed (in m/s), can be negative.
    vSpeed = parseInt(inputs[3]); // the vertical speed (in m/s), can be negative.
    fuel = parseInt(inputs[4]); // the quantity of remaining fuel in liters.
    rotate = parseInt(inputs[5]); // the rotation angle in degrees (-90 to 90).
    power = parseInt(inputs[6]); // the thrust power (0 to 4).

    if (isNotOverTarget()) {
        if (goesInWrongDirection() || goesTooFastHorizontally()) {
            power = 4;
            rotate = angleToSlow();
        } else if (goesTooSlowHorizontally()) {
            power = 4;
            rotate = angleToAimTarget();
        } else {
            rotate = 0
            power = powerToHover();
        }
    } else {
        if (isFinishing()) {
            power = 3;
            rotate =0;
        } else if (hasSafeSpeed()) {
            power = 2;
            rotate =0;
        } else  {
            power = 4;
            rotate = angleToSlow(); 
        }
    }
    
    print(Math.round(rotate) + ' ' + power);
}