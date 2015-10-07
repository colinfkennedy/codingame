/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var road = parseInt(readline()); // the length of the road before the gap.
var gap = parseInt(readline()); // the length of the gap.
var platform = parseInt(readline()); // the length of the landing platform.
var speed,
    coordX;

function tooSlow() {
    return speed < gap + 1;   
}

function tooFast() {
    return speed > gap + 1;
}

function atGap() {
    return coordX >= road - 1;
}

function overGap() {
    return coordX >= road + gap;
}

// game loop
while (true) {
    speed = parseInt(readline()); // the motorbike's speed.
    coordX = parseInt(readline()); // the position on the road of the motorbike.
    var action;
    // Write an action using print()
    // To debug: printErr('Debug messages...');
    printErr("Motorbike positon: " + coordX);
    printErr("Length of road: " + road);
    printErr("Length of gap: " + gap);

    if(tooSlow()) {
        printErr("Too slow to make gap. Increasing speed");
        action = 'SPEED';
    } else if(tooFast()) {
        printErr("Too fast. Decreasing speed");
        action = 'SLOW';
    } else {
        printErr("Correct speed, Maintaining");
        action = 'WAIT';
    }

    if(atGap()) {
        printErr("Just before Gap... JUMP!");
        action = 'JUMP';
    }

    if(overGap()) {
        printErr("Over Gap... stop!");
        action = 'SLOW';
    }

    print(action); // A single line containing one of 4 keywords: SPEED, SLOW, JUMP, WAIT.
}