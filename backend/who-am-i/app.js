const express = require('express');
const app = express();

// Responds with visitor info obtained from request obj
app.get('/', (req, res) => {
    // Get ip
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

    // Get lang
    for (let i = 0; i < req.headers['accept-language'].length; i++) {
        if (req.headers['accept-language'][i] === ',') {
            var lang = req.headers['accept-language'].substr(0, i);
        }
    }

    // Get software
    var switchOne = true;
    var switchTwo = true;
    for (let l = 0; l < req.headers['user-agent'].length; l++) {
        if (req.headers['user-agent'][l] === '(' && switchOne) {
            var softwareStart = l + 1;
            switchOne = false;
        }
        if (req.headers['user-agent'][l] === ')' && switchTwo) {
            var softwareEnd = l - softwareStart;
            switchTwo = false;
        }
    }
    var sw = req.headers['user-agent'].substr(softwareStart, softwareEnd);

    res.json({ ipaddress: ip, language: lang, software: sw });

});

app.listen(process.env.PORT);
