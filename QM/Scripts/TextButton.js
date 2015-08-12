/**
 * File: TextButton.js
 * Desc: This is a generic button class for the QuestMaker user interface.
 * To Do:
 *    -> Write a function to handle the string values for text height and font
 *    -> Adjust the button height accordingly
 *    -> Add option for border styles
 *    -> Add error message handling, eg if no context or mouse
 */

"use strict"

var QM = (function(QM){

	class TextButton{
		constructor(text, x, y, radius, context, mouse, font, strokeColor, fillColor, textColor){
			this.text = text;
			this.x = x;
			this.y = y;

			this.font = font;
			this.width = undefined; // 40 is a buffer value (eg 20 either side of text)

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

		/**
		 * METHOD: drawButton
		 * DESC: This method draws the button to the context.
		 *    If the button is selected draw the stroke and text in yellow.
		 */
		drawButton()
		{
			this.context.font = this.font; // Set the font for width measurements

			this.width = this.context.measureText(this.text).width;

			// Draw the button.
			if(this.isSelected())
			{
				this.context.strokeStyle = "#FFFF00"; // Yellow
			} else {
				this.context.strokeStyle = this.strokeColor;			
			}
			this.context.fillStyle = this.fillColor;
			QM.Canvas2D.roundedRectangle(
				this.x, 
				this.y, 
				this.width + 20, // 20 represents a buffer of 60px
				this.height, 
				this.radius
			);

			// Draw the text.
			if(this.isSelected())
			{
				this.context.fillStyle = "#FFFF00"; // Yellow
			} else {
				this.context.fillStyle = this.textColor;
			}
			
			this.context.textAlign = "left";
			this.context.fillText(
				this.text,
				this.x + 10,
				this.y + 32,
				this.context.measureText(this.text).width
			);
		};
	};

	QM.TextButton = TextButton;
	return QM;
})(QM || {});