function Vector(x, y) {
	this.x = x;
	this.y = y;
}

function Control() {
	this.div;
	this.canvas;
	this.context;
	
	this.initialize = function() {
		this.div = document.createElement('div');
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.div.appendChild(this.canvas);
	}

	this.increaseLeft = function(value) {
//		this.div.style.left = parseInt(this.div.style.left) + value;
//		this.div.style.width = parseInt(this.div.style.width) - value;
//		this.canvas.width = parseInt(this.canvas.width) - this.value;
		
	}
	
	this.openCover = function(value, pattern) {
		if ('l2r' == pattern) {
			this.cover.div.style.left = parseInt(this.cover.div.style.left) + value;
			this.cover.div.style.width = parseInt(this.cover.div.style.width) - value;
			this.cover.canvas.width = parseInt(this.cover.canvas.width) - value;
		} else if ('b2t' == pattern) {
			this.cover.div.style.height = parseInt(this.cover.div.style.height) - value;
			this.cover.canvas.height = parseInt(this.cover.canvas.height) - value;
		} else if ('t2b' == pattern) {
			this.cover.div.style.top = parseInt(this.cover.div.style.top) + value;
			this.cover.div.style.height = parseInt(this.cover.div.style.height) - value;
			this.cover.canvas.top = parseInt(this.cover.canvas.top) + value;
			this.cover.canvas.height = parseInt(this.cover.canvas.height) - value;
		}
	}
	
	this.setLeft = function(value) {
		this.div.style.left = value;
	}
	this.getLeft = function() {
		return parseInt(this.cover.div.style.left);
//		return parseInt(this.div.style.left);
	}
	
	this.setWidth = function(value) {
		this.div.style.width = value;
		this.canvas.width = value;
	}
	this.getWidth = function() {
		return parseInt(this.div.style.width);
	}
	
	this.setHeight = function(value) {
		try {
			this.div.style.height = value;
			this.canvas.height = value;
			this.cover.div.style.height = value;
			this.cover.canvas.height = value;
		} catch (e) {
		}
	}
	this.getHeight = function() {
		return parseInt(this.div.style.height);
	}
	
	this.setZIndex = function(value) {
		this.div.style.zIndex = value;
	}
	this.getZIndex = function() {
		return parseInt(this.div.style.zIndex);
	}
	
	this.setTop = function(value) {
		this.div.style.top = value;
	}
	this.getTop = function() {
		return parseInt(this.div.style.top);
	}
	this.increaseTop = function(value) {
		this.div.style.top = parseInt(this.div.style.top) + value;
	}
	
}

function ControlCommand() {
	this.receiver;
	this.execute = function() {
	}
}