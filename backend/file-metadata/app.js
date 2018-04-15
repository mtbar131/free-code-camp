const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest:'uploads/' });
const app = express();

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Upload handler
app.post('/upload', upload.single('file'), (req,res) => {
    return res.json(req.file);
});

app.listen(process.env.PORT);