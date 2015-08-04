//=====================================================================================
// File: Canvas2D.js
// Desc:
//=====================================================================================

var QM = (function(QM){
	function Canvas2D()
	{
		this.canvas = undefined;
		this.context = undefined;
	};

	Canvas2D.prototype.initialize = function(canvasName)
	{
		this.canvas = document.getElementById(canvasName);
		this.context = this.canvas.getContext("2d");
	};

	QM.Canvas2D = new Canvas2D();

	return QM;
})(QM || {});