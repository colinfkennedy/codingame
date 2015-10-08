/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var n = parseInt(readline()); // the number of temperatures to analyse
var temps = readline().split(" ");; // the n temperatures expressed as integers ranging from -273 to 5526
var closestToZero = 5527;

// Write an action using print()
// To debug: printErr('Debug messages...');

for(i = 0; i < n; i++) {
    temperature = temps[i];
    printErr("Temp: " + temperature);
    if(Math.abs(temperature) < Math.abs(closestToZero)) {
        printErr("Temp " + temperature + " is less than old closest: " + closestToZero);
        closestToZero = temperature;
    } else if (Math.abs(temperature) === Math.abs(closestToZero)) {
        closestToZero = Math.abs(temperature);
    }
}

if(n === 0) {
    closestToZero = 0;
}
printErr("Closest to Zero: " + closestToZero);

print(closestToZero);