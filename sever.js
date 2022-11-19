// Dependencies
const express = require('express');
const html = require('./router/htmlRoutes')
const api = require('./router/apiRoutes')
const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))

// data response
app.use('/api', api)


//html response 
app.use('/', html)

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
    console.log(`Server listening on: http://localhost:${PORT}/`)
});



