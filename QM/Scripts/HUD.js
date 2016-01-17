"use strict"

var QM = (function(QM){
	
	function HUD(){
		this.divHud = document.createElement("div");
		this.header = document.createElement("header");
		this.increaseScaleButton = document.createElement("button");
		this.decreaseScaleButton = document.createElement("button");
		this.setupHUD();
	}

	HUD.prototype.setupHUD = function(){
		this.divHud.id = "divHud";

		document.getElementById("divGameSpace").appendChild(this.divHud);
		/*
		this.divHud.addEventListener("mousemove", QM.Mouse.onMousemove, false);
		this.divHud.addEventListener("mousedown", QM.Mouse.onMousedown, false);
		this.divHud.addEventListener("mouseup", QM.Mouse.onMouseup, false);
		*/

		document.onkeydown 	= QM.Input.keyboard.onKeyDown;
		document.onkeyup 	= QM.Input.keyboard.onKeyUp;

		this.increaseScaleButton.id = "bIncreaseScale";
		this.increaseScaleButton.innerHTML += "Increase Scale";
		this.increaseScaleButton.onclick = function(){ QM.gameState.gridScale += .1; };

		this.decreaseScaleButton.id = "bDecreaseScale";
		this.decreaseScaleButton.innerHTML += "Decrease Scale";
		this.decreaseScaleButton.onclick = function(){ QM.gameState.gridScale -= .1; };

		//document.getElementById("divHud").appendChild(this.increaseScaleButton);
		//document.getElementById("divHud").appendChild(this.decreaseScaleButton);
		//document.getElementById("divGameSpace")[0].appendChild
		try {
			document.getElementById("divGameSpace").insertBefore(this.increaseScaleButton, document.getElementById("divGameSpace").childNodes[0]);
		} catch (e){
			console.log(e);
		}
	};

	QM.HUD = HUD;
	return QM;
})(QM || {});