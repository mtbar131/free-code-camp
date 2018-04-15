// Imports
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const server = express();


// Static folder
server.use(express.static(path.join(__dirname, 'public')));

//Connect DB
mongoose.connect('changeme');
require('./models/Result');
const Result = mongoose.model('results');

// Middleware
server.engine('handlebars', exphbs({ defaultLayout: 'main' }));
server.set('view engine', 'handlebars');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Routing
server.get('/', (req, res) => res.render('index'));
server.get('/recent', (req, res) => {
    Result.find({})
        .sort({ date: 'desc' })
        .then(results => {
            // Only show user most recent 10 searches
            if (results.length > 10) {
                results = results.slice(0, 10);
            }
            res.render('recent', { results: results });
        });
});
server.get('/results2', (req,res) => {
    Result.find({})
        .sort({ date: 'desc' })
        .then(results => {
            // Req setup
            let key = 'changeme';
            let host = 'https://api.cognitive.microsoft.com';
            let path = '/bing/v7.0/images/search';
            let term = results[0].title;
            
            // Make request
            var request = require('request');

            request.get({
                url: host + path + '?q=' + term,
                headers: {
                    'Ocp-Apim-Subscription-Key': key,
                }
            }, (error, response, body) => {
                    if(error) {
                        console.log(error);
                    }   
                    
                    // Show data
                    // Note: returns 35 results (by default // this app uses said default setting))
                    var resultsArr = [];
                    for (let i = 0; i < 35; i++) {
                        resultsArr.push({ title:  JSON.parse(body).value[i].name, link: JSON.parse(body).value[i].contentUrl });
                    }
                    
                    // Show next button if applicable
                    var showNext = false;
                    if (resultsArr[20] !== undefined) {
                        showNext = true;
                    }
                    
                    var results2 = resultsArr.slice(10,20);
                    res.render('results', { results: results2, showNext: showNext, nextLink: '/results3' });
            });
        });
});
server.get('/results3', (req,res) => {
    Result.find({})
        .sort({ date: 'desc' })
        .then(results => {
            // Req setup
            let key = 'changeme';
            let host = 'https://api.cognitive.microsoft.com';
            let path = '/bing/v7.0/images/search';
            let term = results[0].title;
            
            // Make request
            var request = require('request');

            request.get({
                url: host + path + '?q=' + term,
                headers: {
                    'Ocp-Apim-Subscription-Key': key,
                }
            }, (error, response, body) => {
                    if(error) {
                        console.log(error);
                    }   
                    
                    // Show data
                    // Note: returns 35 results (by default // this app uses said default setting))
                    var resultsArr = [];
                    for (let i = 0; i < 35; i++) {
                        resultsArr.push({ title:  JSON.parse(body).value[i].name, link: JSON.parse(body).value[i].contentUrl });
                    }
                    
                    // Show next button if applicable
                    var showNext = false;
                    if (resultsArr[30] !== undefined) {
                        showNext = true;
                    }
                    
                    var results3 = resultsArr.slice(20,30);
                    res.render('results', { results: results3, showNext: showNext, nextLink: '/results4' });
            });
        });
});
server.get('/results4', (req,res) => {
    Result.find({})
        .sort({ date: 'desc' })
        .then(results => {
            // Req setup
            let key = 'changeme';
            let host = 'https://api.cognitive.microsoft.com';
            let path = '/bing/v7.0/images/search';
            let term = results[0].title;
            
            // Make request
            var request = require('request');

            request.get({
                url: host + path + '?q=' + term,
                headers: {
                    'Ocp-Apim-Subscription-Key': key,
                }
            }, (error, response, body) => {
                    if(error) {
                        console.log(error);
                    }   
                    
                    // Show data
                    // Note: returns 35 results (by default // this app uses said default setting))
                    var resultsArr = [];
                    for (let i = 0; i < 35; i++) {
                        resultsArr.push({ title:  JSON.parse(body).value[i].name, link: JSON.parse(body).value[i].contentUrl });
                    }
                    
                    var results4 = resultsArr.slice(30,35);
                    res.render('results', { results: results4 });
            });
        });
});
server.post('/search', (req, res) => {

    // Save to search history
    let newResult = new Result({
        title: req.body.input
    });
    newResult.save()
        .then(result => {
            // Req setup
            let key = 'changeme';
            let host = 'https://api.cognitive.microsoft.com';
            let path = '/bing/v7.0/images/search';
            let term = req.body.input;

            // Make request
            var request = require('request');

            request.get({
                url: host + path + '?q=' + term,
                headers: {
                    'Ocp-Apim-Subscription-Key': key,
                }
            }, (error, response, body) => {
                if(error) {
                    console.log(error);
                }
                
                // Show data
                // Note: returns 35 results (by default // this app uses said default setting))
                var resultsArr = [];
                for (let i = 0; i < 35; i++) {
                    resultsArr.push({ title:  JSON.parse(body).value[i].name, link: JSON.parse(body).value[i].contentUrl });
                }
                
                // Show next button if applicable
                var showNext = false;
                if (resultsArr[10] !== undefined) {
                    showNext = true;
                }
                
                var results1 = resultsArr.slice(0,10);
                res.render('results', { results: results1, showNext: showNext, nextLink: '/results2' });
                
            });
        });
});

// Run
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Running on port ${port}`));
