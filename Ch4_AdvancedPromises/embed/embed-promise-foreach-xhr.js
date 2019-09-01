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
        return fetchURL('https://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
    },
    people: function fetchPeople() {
        return fetchURL('https://azu.github.io/promises-book/json/people.json').then(JSON.parse);
    }
};
function main() {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    // [] は記録する初期値を部分適用してる
    var pushValue = recordValue.bind(null, []);
    // promiseオブジェクトを返す関数の配列
    var tasks = [request.comment, request.people];
    var promise = Promise.resolve();
    // スタート地点
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        promise = promise.then(task).then(pushValue);
    }
    return promise;
}