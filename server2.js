var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var app     = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/scrape', function(req, res){
    
    url = 'http://www.imdb.com/title/tt1300854/'; //url to ironman 3

    request(url, function(error, response, html){
        if(!error) {
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = { title : "", release : "", rating : ""};
            
            // this is where cheerio acts like jquery...
            $('h1').filter(function(){
                var data = $(this);
                title = data.text();            
                release = data.children().last().children().text();

                json.title = title;
                json.release = release;

            })

            $('span.rating').filter(function(){
                var data = $(this);
                rating = data.text();
                json.rating = rating;
            })
        }

        // and then...

    });
});

app.listen('1337');
console.log('Magic happens on port 1337');

