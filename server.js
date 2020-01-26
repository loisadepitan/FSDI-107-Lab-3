var express = require("express");
var app = express(); // create an app
var itemList = []; // store items on this array

/***************************************************************************************************************
 * CONFIGURATION
 ******************************************************************************************************/

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Rquested-With, Content-Type, Accept");
    next();
});

// config body-parse to read info in request
var bparser = require("body-parser");
app.use(bparser.json());


//config body-parse to read info in request
var ejs = require('ejs');
app.set('views', __dirname + '/public'); // where are the Html files?
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);


// to server static files ( css, js, img, pdfs )
app.use(express.static(__dirname + '/public'))


//to serve HTML
var ejs = require('ejs');
app.set('views', __dirname + '/public'); //where are the HTML files?





/********************************************************************************* 
 * wEB SERVER ENDPOINTS
 * ********************************************************************************/





app.get('/', (req, res) => {
    res.render('catalog.html');
});

app.get('/contact', (req, res) => {
    res.send("This will be the contact page, people working over there!");
});

app.get('/aboutme', (req, res) => {
    res.render("about.html");

});

app.get('/exc/:message', (req, res) => {
    console.log("message from client: ", req.params.message);


    var msj = req.params.message;
    var vowels = '';
    var allVowels = ['a', 'e', 'i', 'o', 'u'];
    //1 travel the msj string and print on the console each letter

    for (var i = 0; i < msj.length; i++) {
        var letter = msj[i];
        console.log(letter);
        //2 check if each letter is a vowel
        // if it is, add the vowel to vowels string
        if (allVowels.indexOf(letter.toLowerCase()) != -1) {
            //3 return each vowel ONLY ONCE
            // hellooo -> eo
            // This is a test => iae
            if (!vowels.includes(letter)) {
                //DECIDE
                vowels += letter;
            }

        }


    }


    res.status(202);
    res.send(vowels);
})


/********************************************************************************************
*API END POINTS
******************************************************************************************** 
* 
* Application
* Programming
* Interface
* */
app.post('/api/items', (req, res) => {
    console.log("clients wants to stare items");

    var item = req.body;
    item.id = itemList.length + 1; // create a consecutive id
    itemList.push(item);

    res.status(201); // 201 => created
    res.json(item); //return the item as json






});


app.get('/api/items', (req, res) => {
    res.json(itemList);

});



/***********************************************************************************************
 * START SERVER
 * /************************************************************************************/


app.listen(8080, function () {
    console.log("server running at http://localhost:8080");
    console.log("Press Ctrl +C to kill it");
}); 
