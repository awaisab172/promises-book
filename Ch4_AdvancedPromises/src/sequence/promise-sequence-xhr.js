"use strict";
var sequenceTasks = require("../../lib/promise-sequence").sequenceTasks;
var fetchURL = require("../../../Ch1_WhatsPromises/src/xhr-promise").fetchURL;
var request = {
    comment: function fetchComment() {
        return fetchURL('https://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
    },
    people: function fetchPeople() {
        return fetchURL('https://azu.github.io/promises-book/json/people.json').then(JSON.parse);
    }
};
function main() {
    return sequenceTasks([request.comment, request.people]);
}

module.exports.main = main;
module.exports.request = request;
