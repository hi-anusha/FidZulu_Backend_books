var express = require('express');
const fs = require('fs');

var team = require('../data/teams')
var router = express.Router();


let read_json_file = () => {
    let file = './data/books_data.json';
    return fs.readFileSync(file);
}

exports.list = () => {
    return JSON.parse(read_json_file());
};

function computePrice(json, percent) {
    percent = percent / 100;
    for (let laptop of json) {
        console.log(laptop.price);
        laptop.price = laptop.price * (1 + percent)
        console.log(laptop.price);
    }
    console.log(json);
    return json
}


/* GET users listing. */
router.get('/books/all/:location?', function(req, res, next) {
    let json_result = JSON.parse(read_json_file());

    let location = req.params.location;
    if (location) {
        location = location.toLocaleLowerCase();
        console.log(`recieved location: ${location}`);
        if (location === 'India') {
            json_result = computePrice(json_result, 18);
        } else if (location === 'Ireland') {
            console.log("TEST");
            json_result = computePrice(json_result, 23);
        } 
        else if (location === 'North Carolina') {
            console.log("TEST");
            json_result = computePrice(json_result, 8);
        }else {
            console.log('not a valid location');
        }
    }
    res.json(json_result);
});

router.get('/books/team', function(req, res, next) {
    res.json(team)
})

module.exports = router;