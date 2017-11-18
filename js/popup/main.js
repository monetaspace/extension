try {
	showInfo(JSON.parse(localStorage["cash"]));
} catch(e) {}
getBalance();
setInterval(getBalance, 10000);