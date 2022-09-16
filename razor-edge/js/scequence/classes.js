/**
 * Concrete Integrator.
 */
function Integrator() {
	this.ignite = function() {
		var rewritable = document.getElementById('rewritable');
		var control = new SketchBook();
		this.sketchBook = control;
		rewritable.appendChild(control.div);
//		control.execute();
	}
}

/**
 *
 */
SketchBook.prototype = new Control();
function SketchBook() {
	
	this.counter = 0;
	this.timer;
	
	this.cover;
	this.lane_0;
	this.lane_1;
	this.lane_100;
	
	this.div = document.createElement('div');
	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');
	this.div.appendChild(this.canvas);
	
	this.div.style.position = 'relative';
	this.div.style.zIndex = 100;
	this.div.style.width = 400;
	this.div.style.height = 100;
//	this.div.style.border = '1px inset black';
	
	this.canvas.width = 0;
	this.canvas.height = 0;
	this.children = new Array();
	
	this.execute = function() {
//		this.timer = setInterval('integrator.sketchBook.handle()', 500);
		this.handle();
	}
	
	this.handle = function() {
		var control;
		switch (this.counter) {
		case 0:

			control = new Lane();
			control.name = "integrator.sketchBook.children[0]";
			control.setWidth(400);
			control.setHeight(100);
			control.stack2Draw = [
				[ 'getLeft() == 0',],
				[ 'getLeft() == 100',],
				[ 'getLeft() == 150',],
				[ 'getLeft() == 200',],
				[ 'getLeft() == 300',],
				[ 'getLeft() == 400',],
			];
			this.div.appendChild(control.div);
			this.children.push(control);
			

			this.children[0].setUpCover();
			this.children[0].cover.div.style.backgroundColor = 'rgb(255, 0, 0)';
			this.children[0].draw();
			this.children[0].ignite();
			
			
			
			break;
		default:
			break;
		}
		this.counter++;
	}
	
	this.div.onclick = function() {
//		clearInterval(integrator.sketchBook.timer);
	}
	
}




Lane.prototype = new Control();
function Lane() {
	this.children = new Array();
	
	// 始点
	this.start = new Vector(0, 0);
	// 終点
	this.goal = new Vector(100, 0);
	// 矩形
	this.isMessage = false;
	// 終端
	this.edge = null;
	
	this.leftAndTopOfRect = new Vector(0, 0);
	
	this.stack2Draw;
	this.indexOfStack2Draw = 0;
	
	this.rectWidth = 10;
	this.rectHeight = 100;
	
	this.caption = 'example';
	
	this.counter = 0;
	this.timer;
	
	this.div = document.createElement('div');
	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');
	this.div.appendChild(this.canvas);
	
	this.div.style.position = 'absolute';
	this.div.style.zIndex = 100 + 10;
	this.div.style.top = 0;
	this.div.style.left = 0;
	this.setWidth(400);
	this.setHeight(100);
	this.setLeft(0);
//	this.div.style.border = '1 inset black';
//	this.div.style.backgroundColor = 'rgb(255, 0, 0)';
	this.cover;
	
	this.increaseIndexOfStack2Draw = function() {
		if (this.stack2Draw.length - 1 === this.indexOfStack2Draw) return;
		this.indexOfStack2Draw++;
	}
	
	this.initialize = function() {
		
		this.draw();
		
		this.setUpCover();
		
		for (var i = 0; i <= this.children.length - 1; i++) {
			this.children[i].initialize();
			this.children[i].ignite();
			this.div.appendChild(this.children[i].div);
		}
		
	}
	
	this.setUpCover = function() {
		var cover = new Control();
		cover.div = document.createElement('div');
		cover.div.style.position = 'absolute';
		cover.setTop(0);
		cover.div.style.zIndex = this.getZIndex() + 10;
		cover.canvas = document.createElement('canvas');
		cover.context = cover.canvas.getContext('2d');
		cover.div.appendChild(cover.canvas);
		cover.setWidth(this.getWidth());
		cover.setHeight(this.getHeight());
		cover.setLeft(0);
		cover.div.style.backgroundColor = 'rgb(186, 183, 224)';
//		cover.div.style.border = '1 inset black';
		cover.div.tag = this;
		cover.div.onclick = function(e) {
			this.tag.increaseIndexOfStack2Draw();
			e.stopPropagation();
		}
		this.div.appendChild(cover.div);
		this.cover = cover;
	}
	
	this.setInterval = function() {
		this.timer = setInterval(this.name + '.handle()', 10);
	}
	
	this.clearInterval = function() {
		clearInterval(this.timer);
	}
	
	this.ignite = function() {
		this.setInterval();
	}
	
	this.handle = function() {
		if (0 == this.stack2Draw.length) return;
		if (this.stack2Draw.length <= this.indexOfStack2Draw) return;
		var targets = this.stack2Draw[this.indexOfStack2Draw];
		for (var i = 0; i <= targets.length - 1; i++) {
			if ( !eval(this.name + '.' + targets[i]) ) {
					
					if (-1 != targets[i].indexOf('getLeft')) {
						this.openCover(1, 'l2r');
					} else {
						this.openCover(1, 'b2t');
					}
			}
		}
		
	}
	
	/**
	 * When you want to append Message Lane to Grand Lane, use me.
	 */
	this.createChild = function(index) {
		var control = new Lane();
		control.name =this.name + '.children[' + this.children.length + ']';
		control.setZIndex(this.getZIndex() - 10);
		control.setLeft(0);
		control.setTop(100 * index);
		control.setHeight(100);
		control.setWidth(400);
		this.div.appendChild(control.div);
		this.children.push(control);
		return control;
	}
	
	this.insertChild = function(index) {
		
		if (1 <= this.children.length) {
			var toTop = 100 * index;
			for (var i = 0; i <= this.children.length - 1; i++) {
//			for (var i = index; i <= this.children.length - 1; i++) {
				if (toTop <= this.children[i].getTop()) {
					this.children[i].increaseTop(100);
				}
			}
		}
		
		var control = new Lane();
		control.name = this.name + '.children[' + this.children.length + ']';
		control.setZIndex(this.getZIndex() - 10);
		// TODO: 100
		control.setTop(100 * index);
		// TODO: 400
		control.setWidth(400);
		// TODO: 100
		control.setHeight(100);
		this.children.push(control);
		this.div.appendChild(control.div);
//		control.initialize();
//		control.ignite();
		this.setHeight(this.children.length * 100);
		
		return control;
	}
	
	this.execute = function() {
	}
	
	this.draw = function() {
		
		
if (this.name == 'integrator.sketchBook.children[0]') return;
		
		this.drawRect(0, 0);
		this.drawId();
		this.drawLifeLine(0, 0);
		if (null != this.edge) {
			do {
				if ('arrow' === this.edge) {
					this.drawArrow();
					break;
				}
				
				if ('complete' === this.edge) {
					this.drawFinishCompletely();
					break;
				}
				
				if ('death' === this.edge) {
					this.drawDeath();
					break;
				}
				
				
			}while (0);
		}
		this.drawChildren();
	}
	
	
	this.div.onclick = function() {
	}
	
	this.drawId = function() {
		var context = this.context;
		context.beginPath();
		context.font = "16px 'ＭＳ Ｐゴシック'";
		context.textAlign = "start";
		context.textBaseline = "top";
		context.fillText(this.caption, this.leftAndTopOfRect.x, this.leftAndTopOfRect.y);
		context.closePath();
	}
	
	this.drawRect = function(x, y) {
		var context = this.context;
		context.beginPath();
		if (this.isMessage) {
			context.strokeRect(this.leftAndTopOfRect.x, this.leftAndTopOfRect.y, this.rectWidth, this.rectHeight);
		} else {
			context.strokeRect(this.start.x, 0, this.rectWidth, this.rectHeight);
		}
		context.closePath();
	}
	
	this.drawLifeLine = function(x, y) {
		var context = this.context;
		context.beginPath();
		
		if (false === this.isMessage) {
			context.moveTo(this.start.x + this.rectWidth, this.start.y + (this.rectHeight / 2));
			context.lineTo(this.goal.x, this.goal.y + (this.rectHeight / 2));
		} else {
			context.moveTo(this.start.x, this.start.y);
			context.lineTo(this.goal.x, this.goal.y);
		}
		context.stroke();
		context.closePath();
	}
	
	/**
	 * @param x 線分終端.x
	 * @param y 線分終端.y
	 */
	this.drawArrow = function() {
		var context = this.context;
		
		context.beginPath();
		if (this.start.y == this.goal.y) {
			context.moveTo(this.goal.x, this.goal.y);
			context.lineTo(this.goal.x - 5, this.goal.y - 5);
		} else {
			if (this.start.y < this.goal.y) {
				context.moveTo(this.goal.x, this.goal.y);
				context.lineTo(this.goal.x + 5, this.goal.y - 5);
			} else {
				context.moveTo(this.goal.x, this.goal.y);
				context.lineTo(this.goal.x - 5, this.goal.y + 5);
			}
		}
		context.stroke();
		context.closePath();
		
		context.beginPath();
		if (this.start.y == this.goal.y) {
			context.moveTo(this.goalt.x, this.goal.y);
			context.lineTo(this.goal.x - 5, this.goal.y + 5);
		} else {
			if (this.start.y < this.goal.y) {
				context.moveTo(this.goal.x, this.goal.y);
				context.lineTo(this.goal.x - 5, this.goal.y - 5);
			} else {
				context.moveTo(this.goal.x, this.goal.y);
				context.lineTo(this.goal.x + 5, this.goal.y + 5);
			}
		}
		context.stroke();
		context.closePath();
	}
	
	this.drawFinishCompletely = function() {
		var context = this.context;
		context.beginPath();
		context.arc(this.goal.x, 50, 5, 0, Math.PI*2, false);
		context.stroke();
		context.closePath();
		
		context.beginPath();
		context.arc(this.goal.x, 50, 2.5, 0, Math.PI*2, false);
		context.fill();
		context.closePath();
	}
	
	this.drawDeath = function() {
		var context = this.context;
		context.beginPath();
		context.moveTo(this.goal.x - 5, this.rectHeight / 2 - 5);
		context.lineTo(this.goal.x + 5, this.rectHeight / 2 + 5);
		context.stroke();
		context.closePath();
		context.beginPath();
		context.moveTo(this.goal.x + 5, this.rectHeight / 2 - 5);
		context.lineTo(this.goal.x - 5, this.rectHeight / 2 + 5);
		context.stroke();
		context.closePath();
	}
	
	this.drawChildren = function() {
		for (var i = 0; i <= this.children.length - 1; i++) {
			this.children[i].draw();
		}
	}
	
}

MessageFigure.prototype = new Control();
function MessageFigure() {
	this.start = new Vector();
	this.goal = new Vector();
	this.edge = null;
	this.draw = function() {
		this.context.beginPath();
		this.context.moveTo(this.start.x, this.start.y);
		this.context.lineTo(this.goal.x, this.goal.y);
		this.context.stroke();
		this.context.closePath();
		
		if (null != this.edge) {
			this.context.beginPath();
			do {
				if ('arrow' === this.edge) {
					if (this.start.y == this.goal.y) {
						this.context.moveTo(this.goalt.x, this.goal.y);
						this.context.lineTo(this.goal.x - 5, this.goal.y + 5);
					} else {
						if (this.start.y < this.goal.y) {
							this.context.moveTo(this.goal.x, this.goal.y);
							this.context.lineTo(this.goal.x - 5, this.goal.y - 5);
						} else {
							this.context.moveTo(this.goal.x, this.goal.y);
							this.context.lineTo(this.goal.x + 5, this.goal.y + 5);
						}
					}
					break;
				}
				
				if ('complete' === this.edge) {
					this.drawFinishCompletely();
					break;
				}
				
				if ('death' === this.edge) {
					this.drawDeath();
					break;
				}
				
				
			}while (0);
			this.context.stroke();
			this.context.closePath();
		}
	}
}
