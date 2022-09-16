function TypeWriter() {

	var timerId;
	var x;
	var y;
	var elevator;
	var lengthOfCurrentPage;
	var lengthOfCurrentLine;
	var lastValue;
	var canvas;
	var body;
	
	this.setCanvas = function(value) {
		this.canvas = value;
	}
	
	// TODO: I will move it
	this.onclick = function(event) {
		location.href = "http://razor-edge.net";
	}
	
	this.inquireLengthWithoutCommand = function(source) {
		var reply = source.length;
		var key = new RegExp("({[^}]*})|({.*)", "g");
//		var key = new RegExp("\{ .* \{", "g");
		if (source.match(key)) {
			reply = source.replace(key, "").length;
		}
		return reply;
	}

/*
	this.inquireStringWithoutCommand = function(source) {
		var reply = new String(source);
		var key = new RegExp("(\{.*\})|(\{.*)", "g");
//		var key = new RegExp("\{ .* \{", "g");
		if (source.match(key)) {
			reply = source.replace(key, "");
		}
		return reply;
	}
*/
	
	this.inquireStringWithCommand = function(source, medium) {
		var reply;
		var destination = medium + source.substring(medium.length, medium.length + 1);
		
		if (20 == this.inquireLengthWithoutCommand(destination)  || source.length == destination.length) {
			
			if (destination.length < source.length) {
				var next = source.substring(destination.length, destination.length + 1);
				if ("{" == next) {
					console.log(source.indexOf("}", destination.length));
					destination += source.substring(destination.length, source.indexOf("}", destination.length) + 1);
				}
			}
			
//			console.log("destination: " + destination);
			reply = destination.length;
		} else {
			reply = this.inquireStringWithCommand(source, destination);
		}
		return reply;
	}
	
	/**
	 * recursible
	 */
	this.inquireLengthWithCommand = function(source) {
/*	
		var reply = 20;
		var counter = 0;
		var cursor = "";
		var lengthWithCommand = source.length;
		return reply;
*/
	}
	
	/**
	 *
	 */
	this.setBody = function(value) {
		this.body = null;
		if (null == this.body) {
			this.body = new Array();
		}
		
		var memento;
		var lines;
		for (var i = 0; i < value.length; i++) {
			memento = value[i];
			lines = Math.ceil(this.inquireLengthWithoutCommand(memento) / 20);
			var line = memento;
			for (var j = 0; j < lines; j++) {
				if (this.inquireLengthWithoutCommand(line) <= 20) {
					this.body.push(line.substring(0, line.length));
				} else {
					this.body.push(line.substring(0, 20));
					line = memento.substring(20 * (j + 1), memento.length);
				}
			}
		}
//		console.log(this.body);
	}
	
	var name;
	this.setName = function(value) {
		this.name = value;
	}

	this.getInstance = function() {
		if (null == this) {
//			this = new TypeWriter();
		}
		return this;
	}
	
	this.execute = function() {
		this.canvas.getContext('2d').clearRect(1, 1, 398, 598);
		this.previousY = -1;
		this.lastValue = "";
		this.x = 0;
		this.y = 0;
		this.elevator = 0;
/*		
		var source = "{ interval 50 }　しかし，それで問題は解決するのか{ }？";
		var key = new RegExp("(\{.*\})|(\{.*)", "g");
		console.log(this.inquireStringWithoutCommand(source));
		console.log(this.inquireLengthWithoutCommand(source));
		console.log(source.match(key));
*/		
		
		this.draw();
	}
	
	this.line;
	this.previousY = -1;
	this.interval = 50;
	this.draw = function() {
		clearInterval(this.timerId);

//		var canvas = document.getElementById('window1');
//		if ( ! canvas || ! canvas.getContext ) console.log("false");
		var context = this.canvas.getContext('2d');
		context.font = "17px 'ＭＳ 明朝'";
		if (3 <= this.elevator) {
//		if (600 <= (30 * this.elevator + 1)) {
			this.elevator = 0;
			context.clearRect(1, 1, 398, 598);
		}
		context.strokeStyle = 'rgb(0, 0, 0)';
		context.strokeRect(0, 0, 400, 200);
		
		if (this.previousY != this.y) {
			this.line = this.body[this.y];
			this.lengthOfCurrentLine = this.inquireStringWithCommand(this.line, new String(""));
			this.lengthOfCurrentPage = this.body.length;
		}
		
		var token = this.lastValue;

		var appendee = this.line.substring(this.x, this.x + 1);
		if ("{" == appendee) {
			var command = "";
			while ("}" != appendee) {
				appendee = this.line.substring(this.x, this.x + 1)
				command += appendee;
				this.x++;
			}
			console.log(command);
			console.log(this.x);
			// TODO: interpret command
//			this.interval = 100;
		}
		
		token += this.line.substring(this.x, this.x + 1);
		
		context.fillText(token, 20, 29 * (this.elevator + 1));
		this.lastValue = token;
		
		if (this.x < this.lengthOfCurrentLine - 1) {
			this.x++;
		} else {
			if (this.lengthOfCurrentPage - 1 == this.y) {
				return;
			} else {
				this.y++;
				this.elevator++;
				this.x = 0;
				this.lastValue = "";
			}
		}
		
		if (3 <= this.elevator) {
//		if (600 <= (30 * this.elevator + 1)) {
			this.timerId = setInterval(this.name + ".draw()", 500);
		} else {
			this.timerId = setInterval(this.name + ".draw()", this.interval);
		}
	}
	
	this.changeSpeed = function(miliSecond) {
		clearInterval(this.timerId);
		this.timerId = setInterval(this.name + ".draw()", miliSecond);
	}
	
}