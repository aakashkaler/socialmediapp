const express=require('express');
const app=express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');

//database mongodb
app.use(express.static('./assets'));
//layout
app.use(expressLayouts);
//extract styles and script from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express router
app.use('/',require('./routes'));

//set view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error in running server:',err);
    }
    console.log('server is running on port',port);
});