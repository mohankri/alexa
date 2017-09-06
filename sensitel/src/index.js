'use strict'; 
var Alexa = require("alexa-sdk");
var APP_ID = undefined // Replace with APPID
//var language = require("./languages");
var queries = require("./queries");

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};


var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },

    'OrderIntent': function () {
        var itemSlot = this.event.request.intent.slots.Order;
	var itemName, itemSlot;
	if (itemSlot && itemSlot.value) {
		itemName = itemSlot.value.toLowerCase();
		itemSlot = itemSlot.name.toLowerCase();
	}
	console.log("itemName " + itemName);
	console.log("itemSlot " + itemSlot);
        var query = this.t("ORDER_QUERY", this.t("SKILL_NAME"), itemName);
	console.log('Query for ' + query);
	var translate = this.t("SENSITEL");
	var item = translate[itemSlot];
	//console.log('item  = ' + item);
	if (item) {
		//console.log('item  found = ' + item);
		var status = " is not completed";
		var flag = Math.floor((Math.random() * 2));
		if (flag) {
			status = " is completed";
		}
		var result = item + itemName + status;
		this.attributes['speechOutput'] = result;
		this.attributes['repromptSpeech'] = this.t("SENSITEL_REPEAT_MESSAGE");
		this.emit(':tellWithCard', this.attributes['speechOutput'], 
				this.attributes['repromptSpeech'], query, item);
	} else {
		console.log('item  not found = ' + item);
		var speechOutput = this.t("SENSITEL_NOT_FOUND_MESSAGE");
		var repromptSpeech = this.t("SENSITEL_NOT_FOUND_REPROMPT");
		if (itemName) {
			speechOutput += this.t("SENSITEL_NOT_FOUND_ITEM", itemName);
		} else {
			speechOutput += this.t("SENSITEL_NOT_FOUND_WITHOUT_ITEM_NAME");
		}
		speechOutput += repomptSpeech;
		this.attributes['speechOutput'] = speechOutput;
		this.attributes['repromptSpeech'] = repromptSpeech;
		this.emit(':ask', speechOutput, repromptSpeech);
	}
    },

    'GeneralIntent': function () {
        var itemSlot = this.event.request.intent.slots.General;
	var itemName;
	if (itemSlot && itemSlot.value) {
		itemName = itemSlot.value.toLowerCase();
		console.log('Welcome Intent  not found = ' + itemName);
        	var query = this.t("GREETING_QUERY", this.t("SKILL_NAME"), itemName);
		console.log('Query for ' + query);
		var translate = this.t("SENSITEL");
		var item = translate[itemName];
		console.log('item  = ' + item);
		console.log('item  found = ' + item);
		this.attributes['speechOutput'] = item;
		this.attributes['repromptSpeech'] = this.t("SENSITEL_REPEAT_MESSAGE");
		this.emit(':tellWithCard', item, this.attributes['repromptSpeech'], query, item);
	} else {
	        this.emit('SayHello')
	}
    },

    'SayHello': function () {
        //this.emit(':tell', 'Greeting from Sensitel.');
       	var query = this.t("WELCOME_MESSAGE", this.t("SKILL_NAME"));
        this.emit(':tell', query);
    },

    'AboutIntent': function() {
         var speechOutput = "I'm developed by Sensitel";
	 this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), speechOutput);
    }

};


var languageStrings = {
    "en": {
        "translation": {
                "SENSITEL": queries.SENSITEL_EN_US,
                "SKILL_NAME": "Sensitel",
                "GREETING_QUERY": "%s  - sensitel  %s.",
                "ORDER_QUERY": "sensitel %s.",
                "SENSITEL_REPEAT_MESSAGE": "Try saying repeat.",
                "SENSITEL_NOT_FOUND_MESSAGE": "I\'m sorry Sensitel do not know",
                "SENSITEL_NOT_FOUND_REPROMPT": "What else can I help with ?",
                "SENSITEL_NOT_FOUND_ITEM_NAME": "Query for %s. ",
                "SENSITEL_NOT_FOUND_WITHOUT_ITEM_NAME": "that query",
		"WELCOME_MESSAGE": "Welcome to %s " 
        }
    },
    "en-US": {
        "translation": {
            "SENSITEL" : queries.SENSITEL_EN_US,
            "SKILL_NAME" : "Sensitel"
        }
    }
}; 
