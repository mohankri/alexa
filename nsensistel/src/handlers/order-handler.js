'use strict';

var Alexa = require('alexa-sdk');
var http = require('http');


var options = {
  "method": "POST",
  "hostname": "54.241.28.203",
  "port": null,
  "path": "/trackaware/handheldapi/parts",
  "headers": {
    //"content-type": "application/x-www-form-urlencoded",
    "content-type": "application/json",
    //"Content-Length": Buffer.byteLength(data),
    "authorization": "Basic a3Jpc2huYTprcmlzaG5hMTE=",
    "cache-control": "no-cache",
    "postman-token": "e80fe97f-ecaa-f410-9cb2-b642bc8185aa"
  }
};

function handleOrderQuery(orderNumber, requestCallBack) {
	var object = {};
	object['tagId'] = orderNumber;
	object['fetchType'] = "details";

	var req = http.request(options, function (res) {
		var chunks = [];
		//console.log("Status Code " + res.statusCode);
		res.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res.on("end", function () {
			if (res.statusCode == 200) {
				var body = JSON.parse(chunks);
				body = JSON.parse(body.message);
				requestCallBack(null, body);
			} else {
				requestCallBack("Status not available", body);
			}
		});
	}).on('error', function(e) {
		console.log("Error " + e.message);
		requestCallBack(new Error(e.message));
	});

	console.log("Query Send " + JSON.stringify(object));
	req.write(JSON.stringify(object));
	req.end();
}


var orderHandlers = {
    'OrderIntent': function() {
        var intentType = this.event.request.intent.slots.Order;
        var itemName, itemValue;
        if (intentType && intentType.value) {
            itemValue = intentType.value.toLowerCase();
            itemName = intentType.name.toLowerCase();
        }

        /* Translate Query */
        //var query = this.t("ORDER_QUERY", this.t("SKILL_NAME"), itemValue);
        //console.log("Query " + query);
        
        var traslate = this.t("SENSITEL");
        var greet = traslate[itemName];
	var self = this;

        handleOrderQuery(itemValue, function responseCallBack(err, data) {
        	console.log("ItemValue received " + itemValue);
		if (err) {
        		console.log("Sorry I couldn't connect to Server " + err);
        		var response = 	greet + " " + itemValue + " " + err;
        		self.emit(':tell', response);
		} else {
        		var response = 	greet + " " + data.tagId + " is " + data.lastTouchPoint_lastStatusCode_description + 
			" by " + data.lastTouchPoint_name;
        		self.emit(':tell', response);
		}
	});



	//request(options, function (error, response, body) {
	//	if (error) throw new Error(error);
  		//console.log(body);
	//});
    }
};

module.exports = orderHandlers;
