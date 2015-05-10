// load math.js
var fs = require('fs');
var FLOAT_MIN = 1e-6;
var FLOAT_MIN2 = 1e-10;

// use math.js
// math.sqrt(-4); // 2i
//
function fn(ln, bi, th) {

    var numerator = Math.exp( -(ln * ln) * th) ;
    var denominator = ln * ln * ( ln * ln + Bi * (Bi-1) );

    return numerator / denominator;
}

function getFirstLnFromBi(Bi) {
    for (ln = 0 ; ln <= 50; ln += 0.000001) {
        if ( Math.abs(ln * (1/Math.tan(ln)) + Bi - 1 , 0) < FLOAT_MIN ) {
            return ln;
        }
    }
    return -1;
}

var tFn = function(Bi, th, firstLn) {

    var ln = firstLn;
    var sigma = fn(ln, Bi, th);

    for (var n = 0; n < 10000; n++) {
        ln += Math.PI;
        var v = fn(ln, Bi, th);
        if (v < FLOAT_MIN2) break;
        sigma += v;
    }

    var T = 1 - 6 * Bi * Bi * sigma;

    /*
    console.log("Bi = " + Bi);
    console.log("Th = " + th);
    console.log("Sigma = " + sigma);
    console.log("Bi = ", Bi, ",Th = ", th, ",T = ", T);
    */
    
    return T;
}

var MAX_BI = 3;
var text = 'T';

var th = 0.001;
for (var Bi = 1; Bi <= MAX_BI ; Bi++) {
    text += ',Bi=' + Bi;
}
text += '\n';

var firstLn = {};
for (var Bi = 1; Bi <= MAX_BI ; Bi++) {
    firstLn[Bi] = getFirstLnFromBi(Bi);
}
console.log("ln = " + firstLn);

for (var th = 0.0001; th <= 1; th += 0.0001 ) {
    text += th;
    for (var Bi = 1; Bi <= MAX_BI ; Bi++) {
        var T = tFn(Bi, th, firstLn[Bi]);
        text += "," + T;
    }
    text += '\n';
}

var fileName = 'data_all.txt';

fs.writeFile(fileName, text, function (err) {
    if (err) throw err;
    console.log('It\'s saved!' + fileName);
});

