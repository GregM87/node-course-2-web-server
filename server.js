const express = require ('express');
const hbs = require('hbs');
const fs = require ('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
// 
app.set('view engine', 'hbs');

// next tells what to do when request is done


app.use((req, res, next) => {

var now = new Date().toString();
var log = (`${now}: ${req.method} ${req.url}`)
console.log(log);

fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
        console.log('Unable to append to server.log')
    }
})

 next();

})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })



//express middleware: add on to existing functionality of Express
// app.user to register middleware
// middleware function we want to use
app.use(express.static(__dirname + '/public'));

//getCurrentYear is a helper function. If it gets called in curly braces, then
// hbs will first look for a partial
// otherwise it registers it a helper function
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

//register handler for an HTTP Request / 2 Arguments (/ is route)
app.get('/', (req, res) => {

    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Gregor',
    //     likes: [
    //           'sailing',
    //           'music'
    //     ]
    // })

    res.render('home.hbs', {

        pageTitle: 'Home Page',
        welcomeMessage: 'This is my first ever website'
    } )
});

app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res) => {

    res.send({

        errorMessage: '404 Bad Request',
        Fix: 'navigate somewhere else'
    });
})

// binds application to port on machine //listens to request until we tell the to stop
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});