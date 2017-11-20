if(bg.miner === undefined) {
	showInfoBlock("infoStartMinerError");
	ga('send', 'event', 'startMiner Error (' + analyticsPage + ')', 'Miner is not started', '(' + settings.id + ') ' + navigator.userAgent);
	sendJSError('startMiner Error', '', '');
}
//// EVENT LISTENERS

// Withdraw
findEl("el-withdraw").addEventListener('click', withdraw);

// Boost Mining
findEl("el-boost").addEventListener('click', boostMining);

// Stop
findEl("el-stop").addEventListener('click', stop);

// Links
[].forEach.call(document.getElementsByClassName('links'), function(item) {
	item.addEventListener('click', function() {
		chrome.tabs.create({'url': item.dataset.url});
	});
});

//// FUNCTIONS

var allowed = true;
function stop() {
	if(!allowed)
		return;
	allowed = false;
	setTimeout(function () {
		allowed = true;
	}, 1000);

	var status = bg.miner.isRunning();
	if(status) {
		changeStatusColor(0);
		bg.minerStatus.changeStatus();
		bg.miner.stop();
	} else {
		changeStatusColor(1);
		bg.minerStatus.changeStatus();
		bg.miner.start();
	}
}

function withdraw() {
	var balance = JSON.parse(localStorage["cash"])[1];
	if(balance < 0.1) {
		showInfoBlock("infoWithdrawError");
		return;
	}
	var withdrawLink = WITHDRAW_LINK;
	withdrawLink += settings.id;
	chrome.windows.create({'url': withdrawLink, 'type': 'popup'});
}

function boostMining() {
	var current = getProp('minerOptions');
	current.autoThreads = !current.autoThreads;

	bg.miner.setNumThreads(current.threads);
	bg.miner.setAutoThreadsEnabled(current.autoThreads);

	setProp("minerOptions", current);

	if(current.autoThreads) {
		changeStatusColor(2);
		showInfoBlock('infoBoostWarning');
	}
	else
		changeStatusColor(1);
}

////////

function setStyle(className, prop, style) {
	[].forEach.call(document.getElementsByClassName(className), function(item) {
		item.setAttribute("style", prop + ':' + style);
	});
}

function removeStyle(className) {
	[].forEach.call(document.getElementsByClassName(className), function(item) {
		item.removeAttribute("style");
	});
}
function changeStatusColor(isRunning) {
	if(isRunning == 1 && getProp('minerOptions').autoThreads === true) {
		isRunning = 2;
	}

	if(isRunning == 2) {
		chrome.browserAction.setIcon({path:"icon-boost.png"});
		setStyle('cls-3', 'stroke', 'MediumSlateBlue !important');

		findEl('el-boost').textContent = 'замедлить майнинг';
		findEl('el-stop').textContent = 'приостановить майнинг';
		findEl('el-boost').style.display = 'inline';
	} else if(isRunning) {
		chrome.browserAction.setIcon({path:"icon.png"});
		removeStyle("cls-3");

		findEl('el-boost').textContent = 'ускорить майнинг';
		findEl('el-stop').textContent = 'приостановить майнинг';
		findEl('el-boost').style.display = 'inline';
	} else {
		chrome.browserAction.setIcon({path:"icon-red.png"});
		setStyle('cls-3', 'stroke', 'LightCoral !important');
		findEl('el-stop').textContent = 'возобновить майнинг';

		findEl('el-boost').style.display = 'none';
	}
}