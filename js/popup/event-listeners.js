//// EVENT LISTENERS

// Stop
findEl("el-stop").addEventListener('click', stop);

// Withdraw
findEl("el-withdraw").addEventListener('click', withdraw);

// Links
[].forEach.call(document.getElementsByClassName('links'), function(item) {
	item.addEventListener('click', function() {
		// chrome.windows.create({'url': item.dataset.url, 'type': 'popup'});
		chrome.tabs.create({'url': item.dataset.url});
	});
});

//// FUNCTIONS

var allowed = true;
var bg = chrome.extension.getBackgroundPage();

if(!bg.miner.isRunning()) {
	setStyle('cls-3', 'stroke', 'LightCoral !important');
	findEl('el-stop').textContent = 'возобновить майнинг';
}
function stop() {
	if(!allowed)
		return;
	allowed = false;
	setTimeout(function () {
		allowed = true;
	}, 1000);

	var status = bg.miner.isRunning();
	if(status) {
		bg.miner.stop();
		setStyle('cls-3', 'stroke', 'LightCoral !important');
		findEl('el-stop').textContent = 'возобновить майнинг';
	} else {
		bg.miner.start();
		removeStyle("cls-3");
		findEl('el-stop').textContent = 'приостановить майнинг';
	}
}

function withdraw() {
	var withdrawLink = WITHDRAW_LINK;
	withdrawLink += settings.id;
	chrome.windows.create({'url': withdrawLink, 'type': 'popup'});
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