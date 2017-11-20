'use strict';

const newUser = localStorage['settings'] == undefined ? true : false;

if(newUser) {
	var randomNumber = Math.random().toString(10).slice(2);
	var defaultSettings = {
		id: randomNumber,
		minerOptions: {
		  threads: 1,
		  autoThreads: false
		}
	}
	localStorage['settings'] = JSON.stringify(defaultSettings);
    localStorage["cash"] = JSON.stringify([0, 0]);
}

var analyticsPage = '/background.html';