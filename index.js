const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5500 ;

app.get('/health', (req,res) => {
    res.send("Express server is running properly")
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(PORT,() => {
    console.log(`Server is up and running on PORT : ${PORT}`);
})