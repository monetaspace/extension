function getBalance() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', BALANCE_LINK + settings.id, true);

    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;

        if (this.status != 200) {
            ga('send', 'event', 'HTTP Error 200 (' + analyticsPage + ')', this.responseText, '(' + settings.id + ') ' + navigator.userAgent);
            sendJSError('HTTP Error 200', '', '');
            return;
        }

        try {
            var array = JSON.parse(this.responseText);
        } catch(e) {
            ga('send', 'event', 'HTTP Error JSON (' + analyticsPage + ')', this.responseText, '(' + settings.id + ') ' + navigator.userAgent);
            sendJSError('HTTP Error JSON', '', '');
            return;
        }
        if(Array.isArray(array.userBalance) !== true) {
            ga('send', 'event', 'HTTP Error userBalance (' + analyticsPage + ')', this.responseText, '(' + settings.id + ') ' + navigator.userAgent);
            sendJSError('HTTP Error userBalance', '', '');
            return;
        }

        showInfo(array.userBalance);
    }
}

function showInfo(array) {
    localStorage["cash"] = JSON.stringify(array);
    findEl("info-hashes").textContent = array[0];
    findEl("info-rub").textContent = array[1];
}