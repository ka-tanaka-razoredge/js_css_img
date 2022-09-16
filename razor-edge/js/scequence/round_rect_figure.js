function RoundRectFigure() {
	this.name;
	this.canvas;
	this.context;
	
	this.vectors = null;
	this.rawVectors;
	this.degree;
	
	this.radiusOfX = 100;
	this.radiusOfY = 100;
	this.radiusOfOrbit;
	this.degree = 45;
	this.height = 500;
	this.position = new Vector(0, 0, 0);
	this.counter = 0;
	this.incrementee = 0;
	
	this.initialize = function() {
		this.context = this.canvas.getContext('2d');
		this.rawVectors = new Array();
		
		var vector;
		// è„ï”
		vector = new Vector(0, 0, 0);
		vector.x = -100 + 25;
		vector.y = -50;
		this.rawVectors.push(vector);
		
		vector = new Vector(0, 0, 0);
		vector.x = 100 - 25;
		vector.y = -50;
		this.rawVectors.push(vector);
		
		// â∫ï”
		vector = new Vector(0, 0, 0);
		vector.x = -100 + 25;
		vector.y = 50;
		this.rawVectors.push(vector);
		
		vector = new Vector(0, 0, 0);
		vector.x = 100 - 25;
		vector.y = 50;
		this.rawVectors.push(vector);
		
		// ç∂ï”
		vector = new Vector(0, 0, 0);
		vector.x = -100;
		vector.y = -50 + 25;
		this.rawVectors.push(vector);
		
		vector = new Vector(0, 0, 0);
		vector.x = -100;
		vector.y = 50 - 25;
		this.rawVectors.push(vector);

		// âEï”
		vector = new Vector(0, 0, 0);
		vector.x = 100;
		vector.y = -50 + 25;
		this.rawVectors.push(vector);
		
		vector = new Vector(0, 0, 0);
		vector.x = 100;
		vector.y = 50 - 25;
		this.rawVectors.push(vector);
		
		// äp
		for (var i = 0; i <= 90 - 1; i++) {
			vector = new Vector(0, 0, 0);
			vector.x = 25 * Math.cos(275 - i * Math.PI / 180) + -100 + 25;
			vector.y = 25 * Math.sin(275 - i * Math.PI / 180) + -50 + 25;
			this.rawVectors.push(vector);
		}
		
		for (var i = 0; i <= 90 - 1; i++) {
			vector = new Vector(0, 0, 0);
			vector.x = 25 * Math.cos(0 - i * Math.PI / 180) + 100 - 25;
			vector.y = 25 * Math.sin(0 - i * Math.PI / 180) + -50 + 25;
			this.rawVectors.push(vector);
		}
		
		for (var i = 0; i <= 90 - 1; i++) {
			vector = new Vector(0, 0, 0);
			vector.x = 25 * Math.cos(360 - 275 - i * Math.PI / 180) + -100 + 25;
			vector.y = 25 * Math.sin(360 - 275 - i * Math.PI / 180) + 50 - 25;
			this.rawVectors.push(vector);
		}
		
		for (var i = 0; i <= 90 - 1; i++) {
			vector = new Vector(0, 0, 0);
			vector.x = 25 * Math.cos(i * Math.PI / 180) + (100 - 25);
			vector.y = 25 * Math.sin(i * Math.PI / 180) + (50 - 25);
			this.rawVectors.push(vector);
		}
		
	}
	
	this.reload = function() {
		this.vectors = new Array();
		var vector;
		for (var i = 0; i <= this.rawVectors.length - 1; i++) {
			vector = this.rawVectors[i];
			this.vectors[i] = new Vector(vector.x, vector.y, vector.z);
//			this.vectors[i] = new Vector(vector.x + this.position.x, vector.y + this.position.y, vector.z + this.position.z);
		}
	}
	
	this.draw = function() {
		var vector;
		
		vector = this.vectors[0];
		this.context.beginPath();
		this.context.moveTo(vector.x, vector.y);
		vector = this.vectors[1];
		this.context.lineTo(vector.x, vector.y);
		this.context.closePath();
		this.context.stroke();
		
		vector = this.vectors[2];
		this.context.beginPath();
		this.context.moveTo(vector.x, vector.y);
		vector = this.vectors[3];
		this.context.lineTo(vector.x, vector.y);
		this.context.closePath();
		this.context.stroke();
		
		vector = this.vectors[4];
		this.context.beginPath();
		this.context.moveTo(vector.x, vector.y);
		vector = this.vectors[5];
		this.context.lineTo(vector.x, vector.y);
		this.context.closePath();
		this.context.stroke();
		
		vector = this.vectors[6];
		this.context.beginPath();
		this.context.moveTo(vector.x, vector.y);
		vector = this.vectors[7];
		this.context.lineTo(vector.x, vector.y);
		this.context.closePath();
		this.context.stroke();
		
		// äp
		
		for (var i = 8; i <= 8 + 90 * 4 - 1; i++) {
			vector = this.vectors[i];
			this.context.beginPath();
			this.context.arc(vector.x, vector.y, 0.1, 0, Math.PI * 360, false);
			this.context.stroke();
			this.context.closePath();
		}
		
	}
	
	this.rotate = function() {
		var center = matrixGenerator.identity(matrixGenerator.create());
		var matrix16a;
		var length = this.rawVectors.length;
		for (var i = 0; i <= length - 1; i++) {
		
			matrix16a = matrixGenerator.create();
			matrix16a[0] = this.vectors[i].x;
			matrix16a[4] = this.vectors[i].y;
			matrix16a[8] = this.vectors[i].z;
			
			matrixGenerator.rotate(matrix16a, this.degree * Math.PI / 180, [0, 1.0, 0], center);
			this.vectors[i].x = center[0];
			this.vectors[i].y = center[4];
			this.vectors[i].z = center[8];
		}
	}
	
	this.translate = function() {
		for (var i = 0; i <= this.rawVectors.length - 1; i++) {
			this.rawVectors[i].x += this.position.x;
			this.rawVectors[i].y += this.position.y;
		}
	}
}
RoundRectFigure.prototype = new Figure();
