function showInfoBlock(text) {
	var source   = document.getElementById("infoTemplate").innerHTML;
	var template = Handlebars.compile(source);
	var context  = {
		text: chrome.i18n.getMessage(text)
	};
	var html     = template(context);

	var elem = document.createElement('div');
	elem.innerHTML = html;
	elem = elem.firstElementChild;
	// elem.getElementsByClassName('close')[0].addEventListener('click', closeInfo);
	elem.onclick = function(event) {
		if (event.target.classList.contains("close")) {
			this.parentNode.removeChild(this);
		} else if (event.target.tagName == 'A') {
			chrome.tabs.create({'url': event.target.href})
		}
    }
	document.body.appendChild(elem);
}