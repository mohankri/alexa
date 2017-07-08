var query = require("./queries");

var languageStrings = {
    "en": {
        "translation": {
		"SENSITEL": query.SENSITEL_EN_US,
		"SKILL_NAME": "Sensitel",
		"GREETING_QUERY": "%s  - sensitel  %s.",
		"SENSITEL_REPEAT_MESSAGE": "Try saying repeat.",
		"SENSITEL_NOT_FOUND_MESSAGE": "I\'m sorry Sensitel do not know",
		"SENSITEL_NOT_FOUND_REPROMPT": "What else can I help with ?",
		"SENSITEL_NOT_FOUND_ITEM_NAME": "Query for %s. ",	
		"SENSITEL_NOT_FOUND_WITHOUT_ITEM_NAME": "that query"
        }
    },
    "en-US": {
        "translation": {
            "SENSITEL" : query.SENSITEL_EN_US,
            "SKILL_NAME" : "Sensitel"
        }
    }
};
