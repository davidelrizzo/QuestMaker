"use strict"

var QM = (function(QM){

	class TextButton{
		constructor(text, x, y, radius, context, mouse, strokeColor, fillColor, textColor){
			this.text = text;
			this.x = x;
			this.y = y;

			context.font = "20px Rye";
			this.width = context.measureText(text).width; // 40 is a buffer value (eg 20 either side of text)

			this.height = 40; // 40 is abitrary.  In future base off of text pixel height.
			this.radius = radius;
			this.context = context;
			this.mouse = mouse;
			this.strokeColor = strokeColor;
			this.fillColor = fillColor;
			this.textColor = textColor;
		};

		isSelected()
		{
			if(this.mouse.mousex < this.x) return false;
			if(this.mouse.mousex > (this.x+this.width)) return false;
			if(this.mouse.mousey < this.y) return false;
			if(this.mouse.mousey > (this.y + this.height)) return false;

			return true;
		};

		drawButton()
		{
			this.context.fillStyle = this.fillColor;
			this.context.strokeStyle = this.strokeColor;
			QM.Canvas2D.roundedRectangle(
				this.x, 
				this.y, 
				this.width + 20, // 60 represents a buffer of 60px
				this.height, 
				this.radius
			);

			this.context.fillStyle = this.textColor;
			this.context.font = "20px Rye";
			this.context.textAlign = "left";
			console.log(this.y);
			this.context.fillText(
				this.text,
				this.x + 10,
				this.y + 27,
				this.width
			);
		};
	};

	QM.TextButton = TextButton;
	return QM;
})(QM || {});