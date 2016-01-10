"use strict"

var gh = (function(gh){

	function Agent(name, position, team, sprites){
		this.name			= name;
		this.position       = position;
		this.team			= team;
		this.sprites 		= sprites;
		this.focus          = false;
	}

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