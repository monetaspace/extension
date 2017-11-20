'use strict';

chrome.management.getSelf(function(item) {
	if(item.installType !== 'development') {
		document.oncontextmenu = function() {
			return false;
		}
	}
});

var analyticsPage = '/popup.html';