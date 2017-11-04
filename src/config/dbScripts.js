/*jshint node: true */

function monthLen (abbrev) {
    var thirty = ["apr","jun","sept","nov"];
    if (abbrev=="feb") return 28;
    else if (thirty.indexOf(abbrev)>=0) return 30;
    else return 31
};

function genCal(start, thisMonth) {
    var monthCal = new Array
    for (var i = 0; i < monthLen(thisMonth); i++ ){
        if (i < start) monthCal[i] = -1;
        else monthCal[i] = 0;
    }
    return monthCal;
};

scripts = {
    genCal: genCal,
    monthLen: monthLen
}

module.exports = scripts