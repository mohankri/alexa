'use strict';

//var lang = require("../languages/about").aboutLangString;

const aboutStateEntryIntent = function() {
//	console.log("lang " + JSON.stringify(lang));
//	console.log("lang " + lang);
	console.log("lang " + this.t("WELCOME_MESSAGE"));
	var query = this.t("WELCOME_MESSAGE", this.t("SKILL_NAME"));
	this.emit(':tell', query);
};

module.exports = {
	LaunchRequest() {
		//console.log('Launch Request');
		this.emit(':tell', "Hello");
	},

    AboutIntent() {
		aboutStateEntryIntent.call(this);
	},
	
	Unhandled() {
		console.log('unhandled');
	}
};
