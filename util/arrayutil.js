function forEach(arr, func) {
    var i = 0;
    var arrLength = arr.length;
    for (; i < arrLength; i += 1) {
        func.call(this, i, arr[i]);
    }
}

module.exports = {
    forEach : forEach
}
