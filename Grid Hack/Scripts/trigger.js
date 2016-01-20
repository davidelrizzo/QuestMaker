/**
 * @module gh
 */

"use strict"

/**
 * @class gh
 */
var gh = (function(gh){

	/**
	 * Description
	 * @class Trigger
	 * @method Trigger
	 * @param {} type
	 * @param {} x
	 * @param {} y
	 * @param {} active
	 * @return 
	 */
	function Trigger(type, x, y, active){
		console.log(type);
		this.type 	= type;
		this.x 		= x;
		this.y 		= y;
		this.active = active || false;
	}

	/**
	 * Description
	 * @method isCell
	 * @param {Integer} x
	 * @param {Integer} y
	 * @return Literal
	 */
	Trigger.prototype.isCell = function(x, y){
		if(this.x === x && this.y === y){
			return true;
		}

		return false;
	};

	/**
	 * Description
	 * @class EntryTrigger
	 * @subclass Trigger
	 * @method EntryTrigger
	 * @param {Integer} x
	 * @param {Integer} y
	 * @return 
	 */
	function EntryTrigger(x, y){
		Trigger.call(this, "entry", x, y);
	}
	EntryTrigger.prototype = Object.create(Trigger.prototype);

	/**
	 * Description
	 * @method draw
	 * @param {} context
	 * @param {} scale
	 * @param {} size
	 * @param {} offset
	 * @return 
	 */
	EntryTrigger.prototype.draw = function(context, scale, size, offset){
		if(this.active){
			context.save();

			context.globalAlpha = 0.5;
			context.fillStyle = "blue";
			context.fillRect(this.x*size*scale+offset.x, this.y*size*scale+offset.y, scale*size, scale*size);

			context.restore();
		}
	}

	/**
	 * Description
	 * @event onClick
	 * @method onClick
	 * @param {} args
	 * @return 
	 */
	EntryTrigger.prototype.onClick = function(args){
		if(this.isCell(args.cellX, args.cellY)){
			console.log(this);
			gh.stateSetup.msgPump.postMessage("addPlayer", {"x" : args.cellX, "y" : args.cellY});
		}
	};

	/**
	 *  CLASS ExitTirgger
	 * @method ExitTrigger
	 * @param {} x
	 * @param {} y
	 * @return 
	 */
	function ExitTrigger(x, y){
		Trigger.call(this, "exit", x, y);
	}
	ExitTrigger.prototype = Object.create(Trigger.prototype);

	/**
	 * Description
	 * @method draw
	 * @param {} context
	 * @param {} scale
	 * @param {} size
	 * @param {} offset
	 * @return 
	 */
	ExitTrigger.prototype.draw = function(context, scale, size, offset){
		if(this.active){
			context.save();

			context.globalAlpha = 0.5;
			context.fillStyle = "blue";
			context.fillRect(this.x*size*scale+offset.x, this.y*size*scale+offset.y, scale*size, scale*size);

			context.restore();
		}
	};


	gh.Trigger = Trigger;
	gh.ExitTrigger = ExitTrigger;
	gh.EntryTrigger = EntryTrigger;
	return gh;
})(gh || {});