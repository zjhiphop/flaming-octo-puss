var page = require('webpage').create();

var settings = {
  operation: "POST",
  encoding: "utf8",
  headers: {
    "Content-Type": "application/json"
  },
  data: {
  }
};

function sendBase64ToServer() {
	var base64 = page.renderBase64('PNG');

	console.log(base64);
	
	page.open('http://localhost:8004/', 'post', 'img=' + base64, function(status) {
		console.log(status)
	});
}

page.viewportSize = {
    width: 1920,
    height: 1080
};

page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    })
}

// page.onResourceRequested = function (request) {
//     console.log('Request ' + JSON.stringify(request, undefined, 4));
// };

// page.onResourceReceived = function (response) {
//     console.log('Receive ' + JSON.stringify(response, undefined, 4));
// };

page.open('http://localhost:8000/', function(status) {
    console.log(status);

    setInterval(sendBase64ToServer, 25);

	setTimeout(function(){
		page.render('result.png');
		phantom.exit();
	}, 3000);
});
