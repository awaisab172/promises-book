function fetchURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (200 <= req.status && req.status < 300) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}
var request = {
    comment: function fetchComment() {
        return fetchURL('https://azu.github.io/promises-book/json/comment.json');
    },
    people: function fetchPeople() {
        return fetchURL('https://azu.github.io/promises-book/json/people.json');
    }
};
function main() {
    var results = [];
    var pushValue = Array.prototype.push.bind(results);
    var favValue = fn.bind(null, pushValue);
    return favValue(request.comment()).then(favValue(request.people()));
}