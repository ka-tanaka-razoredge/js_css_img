function Downloader(uri, manager, eventAsString, receiver, request) {

	this.uri = uri;
	this.manager = manager;
	this.receiver = receiver;
	this.requestParameter = request;
	this.xmlHttpRequest = new XMLHttpRequest();
	this.eventAsString = eventAsString;

	this.execute = (function() {

		this.xmlHttpRequest.onreadystatechange = (function() {
			if (this.xmlHttpRequest.readyState == 4) {
				var memento = JSON.parse(this.xmlHttpRequest.responseText);
				for (var key in memento) {
console.log(memento[key]);
					this.receiver.dispatchEvent(new CustomEvent(this.eventAsString, {detail: memento[key]}));
				}

			}
		}).bind(this);

		this.xmlHttpRequest.withCredentials = true;
		this.xmlHttpRequest.open('POST', this.uri);
		this.xmlHttpRequest.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
		this.xmlHttpRequest.send(this.requestParameter);

	}).bind(this);

}
