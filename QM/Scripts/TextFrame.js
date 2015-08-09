"use strict"

var QM = (function(QM){

	/**
	 * Class: TextFrame
	 * Desc: This class is a construct within which multiline text can be written to.
	 *       Note that its only aim is to write text and not features such as background
	 *       or border detailing.
	 */
	function TextFrame(canvas, context, posx, posy, width, height)
	{
		this.canvas = canvas;
		this.context = context;
		this.posx = posx;
		this.posy = posy;
		this.width = width;
		this.height = height;
	};

	TextFrame.prototype.setPosition = function(posx, posy)
	{
		this.posx = posx;
		this.posy = posy;
	}

	/**
	 * Method: writeText
	 * Desc: This method draws the TextFrame to the screen.  It assumes that the
	 *       text style has been set elsewhere.  The text will be written to the limit
	 *       of the text frame size.
	 * Return: This method returns the remaining text not written to the text frame.
	 */
	TextFrame.prototype.writeText = function(text)
	{
		// For display planning purposes.
		//this.context.fillStyle = "grey";
		//this.context.fillRect(this.posx, this.posy, this.width, this.height);

		var textArray = text.split(" ");
		var line = "";
		var w = this.posx + 10;  // In future knowledge of text size required.
		var h = this.posy + 25;  // In future knowledge of text size required.

		this.context.fillStyle = "#000000";

		// shift.
		while(textArray.length > 0 && h < (this.posy + this.height))
		{
			if(this.context.measureText(line + textArray[0]).width > (this.width-20))
			{
				this.context.fillText(line, w, h);
				line = "";
				h += 18;
			} else {
				line += " " + textArray[0];
				textArray.shift();  // remove the first element in the array.
			}
		}

		line = "";
		while(textArray.length > 0)
		{
			line += textArray[0] + " ";
			textArray.shift();
		}

		return line;
	};


	QM.TextFrame = TextFrame;
	return QM;
	
})(QM || {});