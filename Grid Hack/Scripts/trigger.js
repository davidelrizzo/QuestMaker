"use strict"

var gh = (function(gh){

	/**
	 *  BASE CLASS Trigger
	 */
	function Trigger(type, x, y){
		console.log(type);
		this.type = type;
		this.x = x;
		this.y = y;
	}

	/**
	 * INPUT:
	 *
	 */
	Trigger.prototype.isCell = function(x, y){
		if(this.x === x && this.y === y){
			return true;
		}

		return false;
	};

	/**
	 *  CLASS EntryTrigger
	 */
	function EntryTrigger(x, y){
		Trigger.call(this, "entry", x, y);
	}
	EntryTrigger.prototype = Object.create(Trigger.prototype);

	EntryTrigger.prototype.draw = function(context, scale, size, offset){
		context.save();

		context.globalAlpha = 0.5;
		context.fillStyle = "blue";
		context.fillRect(this.x*size*scale+offset.x, this.y*size*scale+offset.y, scale*size, scale*size);

		context.restore();
	}

	EntryTrigger.prototype.onClick = function(args){
		if(this.isCell(args.cellX, args.cellY)){
			// Add a hero?
			// Send addHero message to stateSetup?
			console.log(this);
			gh.stateSetup.msgPump.postMessage("addPlayer", {"x" : args.cellX, "y" : args.cellY});
		}
	};

	/**
	 *  CLASS ExitTirgger
	 */
	function ExitTrigger(x, y){
		Trigger.call(this, "exit", x, y);
	}
	ExitTrigger.prototype = Object.create(Trigger.prototype);


	gh.Trigger = Trigger;
	gh.ExitTrigger = ExitTrigger;
	gh.EntryTrigger = EntryTrigger;
	return gh;
})(gh || {});