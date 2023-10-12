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

function calculateTax(json, percent) {
    percent = percent / 100;
    for (let book of json) {
        
        book.price =book.price+ ( book.price * (percent));
        book.tax_percentage=percent*100;
        
    }
   
    return json
}



router.get('/all/:location?', function(req, res, next) {
    let json_result = JSON.parse(read_json_file());

    let location = req.params.location;
   
    if (location) {
      
        if (location === 'IN') {
            json_result = calculateTax(json_result, 18);
        } else if (location === 'IE') {
            
            json_result = calculateTax(json_result, 23);
        } 
        else if (location === 'US-NC') {
            json_result = calculateTax(json_result, 8);
        }else {
            return res.status(400).json({error: 'Bad Request' });
        }
    }

    const {minprice, maxprice, rating, brand} = req.query;


    const filteredData = json_result.filter((book) => {
        if (minprice !== undefined && book.price < minprice) {
          return false;
        }
    
        if (maxprice !== undefined && book.price > maxprice) {
           return false;
        }
    
        if (rating !== undefined && book.rating < rating) {
           return false;
        }
    
        if (brand !== undefined && book.brand !== brand) {
           return false;
        }
    
        return true;
       });

    
    res.json(filteredData);
});

router.get('/team', function(req, res, next) {
    res.json(team)
})





module.exports = router;