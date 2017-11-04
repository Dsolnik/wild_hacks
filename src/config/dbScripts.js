/*jshint node: true */

//monthID as int from Date().getMonth()
function monthLen (monthID) {
    //months with 30 days: april, june, september november
    var thirty = [3,5,8,10];
    //month is feb
    if (monthID==1) return 28;
    else if (thirty.indexOf(abbrev)>=0) return 30;
    else return 31;
};

//generate calendar from start date
function genCal(start, thisMonth) {
    var monthCal = new Array();
    for (var i = 1; i <= monthLen(thisMonth); i++ ){
        if (i < start) monthCal[i] = -1;
        else monthCal[i] = 0;
    }
    return monthCal;
};

scripts = {
    genCal: genCal,
    monthLen: monthLen
};

module.exports = scripts;