exports.toISOdate = date => {
    //"2019-06-01T11:17:53.452Z"
    /*
    const month = Number(date.getMonth()) + 1;
    const isoString = date.getFullYear() + "-" + this.getDoubleDigit(month) + "-" + this.getDoubleDigit(date.getDate()) + "T" 
        + this.getDoubleDigit(date.getHours()) + ":" + this.getDoubleDigit(date.getMinutes()) + ":" + this.getDoubleDigit(date.getSeconds()) 
        + "." + this.getTripleDigit(date.getMilliseconds()) + "Z";
    return new Date(isoString);
    */
    return date;
}

exports.getDoubleDigit = digit => {
    const digitString = String(digit);
    return digitString.length === 1
        ? "0" + digitString
        : digitString;
};

exports.getTripleDigit = digit => {
    const digitString = String(digit);
    if(digitString.length === 1) return "00" + digitString;
    else if(digitString.length === 2) return "0" + digitString;
    else return digitString;
};