function getBalance() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', BALANCE_LINK + settings.id, true);

    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;

        // по окончании запроса доступны:
        // status, statusText
        // responseText, responseXML (при content-type: text/xml)

        if (this.status != 200) {
            // обработать ошибку
            
            showError(1);
            return;
        }

        // получить результат из this.responseText или this.responseXML
        try {
            var array = JSON.parse(this.responseText);
        } catch(e) {
            showError(2);
            return;
        }
        if(typeof array.userBalance !== "object") {
            showError(3);
            return;
        }

        showInfo(array.userBalance);
    }
}

function showError(error) {
    alert('Произошла ошибка при подключении к серверу. Убедитесь, что у вас отключены блокировщики рекламы (Например adblock).' + error);
}
function showInfo(array) {
    localStorage["cash"] = JSON.stringify(array);
    findEl("info-hashes").textContent = array[0];
    findEl("info-rub").textContent = array[1];
}