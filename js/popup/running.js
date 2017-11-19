'use strict';

var analiticsPage = '/popup.html';

chrome.management.getSelf(function(item) {
	if(item.installType !== 'development') {
		document.oncontextmenu = function() {
			return false;
		}
	}
});