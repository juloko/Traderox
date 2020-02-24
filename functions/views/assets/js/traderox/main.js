urlBase = ""

if (window.location.hostname !== "traderox.web.app") {
  urlBase = "localhost:5000";
} else {
  urlBase = window.location.hostname;
}

function ajax(funct, method, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      "url": `http://${urlBase}/${funct}`,
      "dataType": "json",
      "method": method,
      "cache": false,
      "crossDomain": true,
      "headers": {
        "Accept": 'application/json'
      },
      "data": data,
    }).done((response) => {

      resolve(response);
    }).fail((error) => {
      console.log(`Error getReadable(${JSON.stringify(data)}).`, error);
      reject(error);
    });
  });
}

function getExchanges() {
  ajax("getExchanges", "GET", ""
  ).then(data => {
    fillExchangesAvailable(data);
  }).catch(error => {
    console.log("Error getExchanges().", error);
    setTimeout(() => { getExchanges() }, 3000);
  });
}

async function getMarket() {
  return await ajax("getMarket", "GET", "");
  
}