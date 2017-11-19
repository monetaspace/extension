if(bg.minerStatus.isNotStarted()) {
	setTimeout(runChecker, 3000);
} else
	runChecker();
function runChecker() {
	if (bg.miner.isRunning() !== bg.minerStatus.getStatus()) {
		showInfoBlock("infoStartMinerError");
	}
	if(settings.minerOptions.autoThreads) {
		changeStatusColor(2);
	}
	if(!bg.miner.isRunning()) {
		changeStatusColor(0);
	}
}

try {
	showInfo(JSON.parse(localStorage["cash"]));
} catch(e) {}
getBalance();
setInterval(getBalance, 10000);