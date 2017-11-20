const settings = JSON.parse(localStorage['settings']);

function setProp(prop, value) {
	let currentSettings = JSON.parse(localStorage['settings']);
	currentSettings[prop] = value;
	localStorage['settings'] = JSON.stringify(currentSettings);
	return true;
}
function getProp(prop) {
	let currentSettings = JSON.parse(localStorage['settings']);
	return currentSettings[prop];
}
function findEl(id) {
	return document.getElementById(id);
}

// Google Analytics

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-69241180-4', 'auto');  // Replace with your property ID.
ga('set', 'checkProtocolTask', function(){}); 
ga('send', 'pageview', analyticsPage);

window.onerror = function(msg, url, line) {
	sendJSError(msg, url, line);
	ga('send', 'event', 'JS Error (' + analyticsPage + ')', msg, '(' + settings.id + ') ' + navigator.userAgent + ' -> ' + url + " : " + line);
}

// \Google Analytics

function sendJSError(msg, url, line) {
	var error = SEND_ERROR_URL + 
				'?line=' + encodeURIComponent(line) +
				'&file=' + encodeURIComponent(url) + 
				encodeURIComponent(' (' + settings.id + ') ') + 
				'&error=' + encodeURIComponent(msg);

	var xhr = new XMLHttpRequest();
    xhr.open('GET', error, true);
    xhr.send();
}