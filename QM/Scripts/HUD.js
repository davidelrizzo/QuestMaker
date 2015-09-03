"use strict"

var QM = (function(QM){
	
	function HUD(){
		this.divHud = document.createElement("div");
		this.increaseScaleButton = document.createElement("button");
		this.decreaseScaleButton = document.createElement("button");
		this.setupHUD();
	}

	HUD.prototype.setupHUD = function(){
		this.divHud.id = "divHud";

		document.getElementById("divGameSpace").appendChild(this.divHud);
		this.divHud.addEventListener("mousemove", QM.Mouse.onMousemove, false);
		this.divHud.addEventListener("mousedown", QM.Mouse.onMousedown, false);
		this.divHud.addEventListener("mouseup", QM.Mouse.onMouseup, false);

		this.increaseScaleButton.id = "bIncreaseScale";
		this.increaseScaleButton.innerHTML += "Increase Scale";
		this.increaseScaleButton.addEventListener("click", function(){ QM.gameState.gridScale += .1; });

		this.decreaseScaleButton.id = "bDecreaseScale";
		this.decreaseScaleButton.innerHTML += "Decrease Scale";
		this.decreaseScaleButton.addEventListener("click", function(){ QM.gameState.gridScale -= .1; });

		document.getElementById("divHud").appendChild(this.increaseScaleButton);
		document.getElementById("divHud").appendChild(this.decreaseScaleButton);
	};

	QM.HUD = HUD;
	return QM;
})(QM || {});