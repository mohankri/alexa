'use strict'; 

//process.env.PATH= `${process.env.PATH}:${process.env.LAMDA_TASK_ROOT}`;

const Alexa = require("alexa-sdk");

var APP_ID = undefined //REPLACE with APPID

var query = require('./queries');
const aboutHandler = require('./handlers/about-handler');
const orderHandler = require('./handlers/order-handler');

module.exports.handler = function(event, context, callback) {
	const alexa = Alexa.handler(event, context);

	alexa.resources = languageString;

	alexa.registerHandlers(aboutHandler, orderHandler);
	alexa.execute();
};

//const languageStrings = require('./languages/about');

var languageString = {
    "en": {
        "translation": {
                "ECHOISM": query.ECHOISM_EN_US,
                "SKILL_NAME": "Echoism",
                "WELCOME_MESSAGE": "Hello from %s ",
                "ORDER_QUERY": "Echoism %s."
        }
    },
    "en-US": {
        "translation": {
            //"SENSITEL" : query.SENSITEL_EN_US,
            "SKILL_NAME" : "Echoism"
        }
    }
};
