'use strict'; 

process.env.PATH= `${process.env.PATH}:${process.env.LAMDA_TASK_ROOT}`;

const Alexa = require("alexa-sdk");

var APP_ID = undefined //REPLACE with APPID

const aboutHandler = require('./handlers/about-handler');

module.exports.handler = function(event, context) {
	const alexa = Alexa.handler(event, context);

	alexa.resources = languageString;

	alexa.registerHandlers(aboutHandler);
	alexa.execute();
};

const languageStrings = require('./languages/about');

var languageString = {
    "en": {
        "translation": {
                //"SENSITEL": query.SENSITEL_EN_US,
                "SKILL_NAME": "Echoism",
                "WELCOME_MESSAGE": "Hello from %s "
        }
    },
    "en-US": {
        "translation": {
            //"SENSITEL" : query.SENSITEL_EN_US,
            "SKILL_NAME" : "Echoism"
        }
    }
};
