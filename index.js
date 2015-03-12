var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true})); 

app.get('/api/appid', function(request, response){
	appid = app.get('port') == 8080 ? 295250210676747 : 1435706023342923;
	console.log(appid);
	response.send(''+appid); 
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
