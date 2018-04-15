const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
require('./models/Url');
const Url = mongoose.model('urls');
const app = express();

//Connect DB
mongoose.connect("changeme");

// MW
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home page
app.get('/', (req, res) => res.render('index'));

// Redirects to home if attempt is made to direct access page designated for output
app.get('/shortened', (req, res) => res.redirect('/'));

// Post handler
app.post('/shortened', (req, res, next) => {
    // Note: frontend ensured input is proper url in views/layouts/main handlebars file
    var input = req.body.input;
    
    // Remove http(s)
    if (input.substr(0,8).includes('https')) {
        for (let i = 0; i < 8; i++) {
            input = input.substr(1, input.length);
        }
    }
    else if (input.substr(0,7).includes('http')) {
        for (let i = 0; i < 7; i++) {
            input = input.substr(1, input.length);
        }
    }
    // Remove www
    if (input.substr(0,3).includes('www')) {
        for (let i = 0; i < 4; i++) {
            input = input.substr(1, input.length);
        }
    }
    
    input = `https://${input}`;
    
    // Scan database to prevent duplicates
    Url.findOne({ origUrl: input })
        .then(url => {
            // Url already exists
            if (url) {
                res.render('shortened', { url: url });
            }
            // Doesn't exist, create new
            else {
                var key = generateNumber();
                ensureUnique(key);
                key = key.toString();
                
                let newUrl = new Url({
                    origUrl: input,
                    key: key
                });
                
                newUrl.save()
                    .then(url => res.render('shortened', { url: url }));
            }
        });
        
        function generateNumber() {
            return Math.floor(Math.random() * 10000);
        }
        function ensureUnique(key) {
            
            // Ensures key is unique
            Url.findOne({ key: key })
               .then(url => {
                   if (url) {
                       var newKey = generateNumber();
                       ensureUnique(newKey);
                   }
               });
               
            return key;
        }
});

// Route generated short urls
app.get('/:id', (req, res, next) => {
    
    var id = req.params.id;
    
    Url.findOne({ key: id })
       .then(url => {
           // If in db, reroute accordingly
           if (url) {
               res.writeHead(302, {
                                  'Location': url.origUrl
                            });
                res.end();
           }
           // If not, redirect to homepage
           else {
               res.redirect('/');
           }
       });
});

// Start server
app.listen(process.env.PORT);
