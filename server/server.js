const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // For parsing JSON request bodies

app.post('/api/login', (req, res) => {
    console.log(req.body); //Print the POST request body to console
    res.redirect('http://localhost:4200/gpa-auto')
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})