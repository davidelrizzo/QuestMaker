/**
 * @module gh
 */

"use strict"

/**
 * @class gh
 */
var gh = (function(gh){
	console.log("agents.js laoded");

	/**
	 * @class Agent
	 * @constructor
	 * @param {String} name The identifier of the agent.
	 * @param {Object(Inteter, Integer)} position {x, y} The x,y coordinates of the agent in the game world.
	 * @param {String} team The name of the team (faction) that the agent belongs to.
	 * @param {Object} sprites An object which contains the images for the various action states the agent might be in.
	 * @param {Integer} moveDice The number of dice rolled when a user moves.
	 */
	function Agent(name, position, team, sprites, moveDice, baseMove){
		this.name			= name;
		this.position       = position;
		this.team			= team;
		this.sprites 		= sprites;
		this.focus          = false;
		this.moveDice 		= moveDice || 0;
		this.baseMove		= baseMove || 0;

		this.move           = 0;

		console.log(moveDice);
	}

	/**
	 * @method newTurn
	 * @param {Object} dice A dice of the requisite number of sides to be used when 'rolling' the agents potential movement.
	 */
	Agent.prototype.newTurn = function(dice){
		this.move = 0;

		for(var it = 0; it < this.moveDice; it++){
			this.move = this.move + dice.roll();
		}

		this.move = this.move + this.baseMove;

		console.log(this.move);
	};

	/** 
	 * @method draw
	 * @param {String} imgState
	 * @param {Objext} spriteTable An object which contains images indexed by their sprite name.
	 * @param {Context} context The context upon which the agent is drawn.
	 * @param {Flaot} scale The scale to which the agent is drawn.
	 * @param {Num} cellSize The size of a cell on the map.  This is used to help scale the image to the correct size.
	 * @param {Object} offset The map viewport offset which is used to help determine where the image should be drawn on the context.
	 */
	Agent.prototype.draw = function(imgState, spriteTable, context, scale, cellSize, offset){
        var x = this.position.x*cellSize*scale + offset.x;
        var y = this.position.y*cellSize*scale + offset.y;
        spriteTable[this.sprites[imgState]].draw(context, x, y, cellSize*scale, cellSize*scale);
        if(this.focus){
        	// highlight the mouse location.
        	spriteTable.tokenHighlight.draw(context, x, y, cellSize*scale, cellSize*scale);
        }
	};

	/**
	 * This method moves the agent one step up, down, left or rigth.
	 *
	 * @method onMove
	 * @param {string} args args.direction is one of four values: "left", "right", "up" and "down".
	 *                      args.floor
	 *                      args.agents
	 *                      args.objects
	 */
	Agent.prototype.onMove = function(args){
		/**
		if(!this.currentTurn){
			return false;
		}
		*/

		console.log(args);

		/**
		 * Does the agent have any movement left?
		 */
		console.log(this.move);
		if(this.move <= 0){
			return;
		}

		var pos = {
			"x" : this.position.x,
			"y" : this.position.y
		}

		var cell = args.floor[this.position.y][this.position.x];

		/**
		 * If the border of the cell would block movement in the desired direction return.
		 */
		switch(args.direction){
			case "left":
				if(cell.isBorderBlocked("left")){
					return;
				}
				pos.x--;
				pos.y = this.position.y;
				break;
			case "right":
				if(cell.isBorderBlocked("right")){
					return;
				}
				pos.x++;
				pos.y = this.position.y;
				break;
			case "down":
				if(cell.isBorderBlocked("bottom")){
					return;
				}
				pos.y++;
				pos.x = this.position.x;
				break;
			case "up":
				if(cell.isBorderBlocked("top")){
					return;
				}
				pos.y--;
				pos.x = this.position.x;
				break;
		}

		/**
		 * Is the desired destination a "walkable" cell
		 */
		if(args.floor[pos.y] === undefined){
			return;
		}
		if(!args.floor[pos.y][pos.x].isFloor()){
			return;
		}

		/**
		 * Check to see if the target cell is already occupied by another agent.
		 */
		if(args.agents[pos.y]){
			if(args.agents[pos.y][pos.x]){
				return;
			}
		}

		/**
		 * The move is valid.
		 */
		this.move--;
		console.log(this.move);

		/**
		 * Update the agent location in the map.
		 */
		args.agents[pos.y] = args.agents[pos.y] || [];
		args.agents[pos.y][pos.x] = this;

		/**
		 * Remove the pointer to the agents prior position.
		 */
		args.agents[this.position.y][this.position.x] = undefined;

		/**
		 * Update the agents knowledge of its own location.
		 */
		this.position.x = pos.x;
		this.position.y = pos.y;

		/**
		 * Update the map visiblity
		 */


	}

    /**
     * INPUT
     *    args:
     *        mouseX
     *        mouseY
     *        cellX
     *        cellY
     *        cellSize
     *        offset {x, y}
     *        scale
     *        cell
     *        agents
     *
     * Agents get priority focus, so need to disable the focus on any
     * other objects in a cell if the mouse is over the agent.
     *
     * @method onMouseOver
     *
     */
	Agent.prototype.onMouseOver = function(args){
		var relx;
		var rely;

		if(args.cellX === this.position.x && args.cellY === this.position.y){
	        var ratiox = args.cellSize / gh.assets.sprites[this.sprites.token].img.width;
	        relx = ((args.mouseX - args.offset.x) % (args.cellSize*args.scale));
	        relx = relx / args.scale;
	        relx = relx / ratiox;

	        var ratioy = args.cellSize / gh.assets.sprites[this.sprites.token].img.height;
	        rely = ((args.mouseY - args.offset.y) % (args.cellSize*args.scale));
	        rely = rely / args.scale;
	        rely = rely / ratioy;

	       	var pixel = gh.assets.sprites[this.sprites.token].getPixelColor(relx, rely);
	       	if(!pixel.isTransparent()){
	       		this.focus = true;
	       		// disable focus from other elements in teh same cell
	       		args.cell.focus = false;
	       	    for(var key in args.cell.borders){
	       	    	console.log(key);
	       	    }
	       		return;
	       	} else {
	       		this.focus = false;
	       		return;
	       	}
	       	
		} else {
			this.focus = false;
			return;
		}

        this.focus = false;
	}

	/**
	 * @method isMouseOver
	 */
	Agent.prototype.isMouseOver = function(cellX, cellY, mouseX, mouseY, cellSize, offset, scale){
		var relx;
		var rely;

		if(cellX === this.position.x && cellY === this.position.y){
	        var ratiox = cellSize / gh.assets.sprites[this.sprites.token].img.width;
	        relx = ((mouseX - offset.x) % (cellSize*scale));
	        relx = relx / scale;
	        relx = relx / ratiox;

	        var ratioy = cellSize / gh.assets.sprites[this.sprites.token].img.height;
	        rely = ((mouseY - offset.y) % (cellSize*scale));
	        rely = rely / scale;
	        rely = rely / ratioy;

	       	var pixel = gh.assets.sprites[this.sprites.token].getPixelColor(relx, rely);

            
	       	if(!pixel.isTransparent()){
	       		return true;
	       	} else {
	       		return false;
	       	}
	       	
		} else {
			return false;
		}

        return false;
	};

	gh.Agent = Agent;
	return gh;
})(gh || {});