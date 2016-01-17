//=====================================================================================
// File: Mouse.js
// Desc: Mouse class for handling Input.
//=====================================================================================

"use strict"

var QM = (function(QM){

	function Mouse()
	{
  		this.mousex = 0;
  		this.mousey = 0;
  		this.mouseDown = false;
	}

  Mouse.prototype.onMousemove = function(event)
  {
  	QM.Mouse.mousex = event.pageX;
  	QM.Mouse.mousey = event.pageY;
  };

  Mouse.prototype.onMousedown = function(event)
  {
  	QM.Mouse.mousex = event.pageX;	
   	QM.Mouse.mousey = event.pageY;
  	QM.Mouse.mouseDown = true;
  };

  Mouse.prototype.onMouseup = function(event)
	{
	  QM.Mouse.mouseDown = false;
	};


  QM.Mouse = new Mouse();
	return QM;
	
})(QM || {});