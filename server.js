const port 			      = process.env.ALWAYSDATA_HTTPD_PORT || 3000;
const host 			      = process.env.ALWAYSDATA_HTTPD_IP || 'localhost';
const routes		      = require('./server.routes');
const config              = require('./src/config/config');
const express 		      = require("express"),
      app 			      = express(),
      bodyParser  	      = require("body-parser");


// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(config.allowCorsDomain);

routes.addRoutes(app);

//Midleware token function
//app.use(tokenMw.verifyToken);

// Start server
app.listen(port, host, function() {
	var date = new Date();
	console.log("Started served on port " + port + " at: " 
		+ date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " - " 
		+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
});