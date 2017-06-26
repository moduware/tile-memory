var timeOut;
var counter = 0;

function checkStatus() {
	console.log("checking status");
    Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'StatusCheck', []);
}

document.addEventListener('NexpaqAPIReady', function(event) {
	Nexpaq.API.Module.addEventListener('DataReceived', function(event) {
		// we don't care about data not related to our module
		if(event.module_uuid != Nexpaq.Arguments[0]) return;

		if(event.data_source == 'StatusRequestResponse') {
			if(event.variables.status == "connected") {
				document.getElementById('button-connect').textContent = "Connect";
				document.getElementById('button-connect').classList.add('hidden');
				document.getElementById('button-disconnect').classList.remove('hidden');
				document.getElementById('svg-disconnected').classList.add('hidden');
				document.getElementById('svg-connected').classList.remove('hidden');
				//document.getElementById('button-file-manager').classList.remove('hidden');
			} else if(event.variables.status == "disconnected") {
				document.getElementById('button-disconnect').textContent = "Disconnect";
				//document.getElementById('button-file-manager').classList.add('hidden');
				document.getElementById('svg-connected').classList.add('hidden');
				document.getElementById('svg-disconnected').classList.remove('hidden');
				document.getElementById('button-connect').classList.remove('hidden');
				document.getElementById('button-disconnect').classList.add('hidden');
			}
		} else if(event.data_source == 'StateChangeResponse') {
			if(event.variables.result == 'success') {
				checkStatus()
			}
		}
	});

	checkStatus();

});
/* =========== ON PAGE LOAD HANDLER */
document.addEventListener("DOMContentLoaded", function(event) {
  Nexpaq.Header.create("Backup");
	Nexpaq.Header.customize({color: "white", iconColor:"white", backgroundColor:"#5999DE"});

	document.getElementById('button-connect').addEventListener('click', function() {
		console.log("connecting..");
    document.getElementById('button-connect').textContent = "Connecting...";
		Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'Connect', []);
	});

	document.getElementById('button-disconnect').addEventListener('click', function() {
		console.log("connecting..");
    document.getElementById('button-disconnect').textContent = "Disconnecting...";
		Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'Disconnect', []);
	});

	document.getElementById('button-file-manager').addEventListener('click', function() {
		
	});

	setInterval(checkStatus, 15000);
	
});
