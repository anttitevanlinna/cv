//var oauth = require('./oauthclient');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true})); 

app.get('/api/isMock', function(request, response){
	mock = app.get('port') == 8080 ? true : false;
	console.log(mock);
	response.send(''+mock); 
});

/*oauth.client(function(tokens){
	console.log(tokens.access_token);
});*/

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
