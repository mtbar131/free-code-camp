const express = require('express');
const app = express();

// Returns natural and unix date
app.get('/date/:value', (req, res, next) => {
    var dateVal = req.params.value;
    var dateFormat = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    // Format handler
    if (isNaN(dateVal)) {
        var naturalDate = new Date(dateVal);
        naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
        var unixDate = new Date(dateVal).getTime()/1000;
    }
    else {
        var unixDate = dateVal;
        var naturalDate = new Date(dateVal * 1000);
        naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
    }
    
    res.json({ unix: unixDate, natural: naturalDate });
});

app.listen(process.env.PORT);
