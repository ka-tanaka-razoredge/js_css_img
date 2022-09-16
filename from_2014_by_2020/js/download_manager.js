function DownloadManager() {
	
	this.counter = 0;
	
	this.max = 3;
	
	this.queue = [];
	
	this.timer;
	
	this.routine = (function() {
		if (this.counter <= this.max) {
			this.counter++;
			this.queue.pop().execute();
		}
	}).bind(this);
	
	this.register = (function(downloader) {
		this.queue.push(downloader);
	}).bind(this);
	
	this.receive = (function() {
		this.counter--;
	}).bind(this);
	
	this.ignite = (function() {
		this.timer = setInterval(40, this.routine);
	}).bind(this);
	
	
}