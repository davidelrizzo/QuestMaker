"use strict"

var gh = (function(gh){
	console.log("door.js loaded");

    /**
	 * INPUT
	 *    cell1, cell2: 
	 *        A string denoting the side of a cell which the door
	 *        occupies.  Accepted values are "top", "left", "right", "bottom".
	 *    x1, y1, x2, y2: 
	 *        a number value representing a cell x or y
	 *        coordinate in the map.
	 *    open: 
	 *        boolean value noting whether or not the door is opem.
	 *    images: 
	 *        the sprites which depict the door in its various states.
	 * @method Door
	 * @param {} cell1
	 * @param {} x1
	 * @param {} y1
	 * @param {} cell2
	 * @param {} x2
	 * @param {} y2
	 * @param {} open
	 * @param {} images
	 * @return 
	 */
	function Door(cell1, x1, y1, cell2, x2, y2, open, images){
		this.id = "door";

		this[cell1] = {"x" : x1, "y" : y1};
		this[cell2] = {"x" : x2, "y" : y2};

		this.images = images;

		if(this[cell1].x > this[cell2].x){
			this.side = "left";
		}

		if(this[cell1].y > this[cell2].y){
			this.side = "top";
		}

		this.open = open;
		this.focus = false;
	}

	/**
	 * DESC
	 *    Change the state of the door from open to closed or vis versa.
	 * INPUT
	 *    args:
	 * @method onUse
	 * @param {} args
	 * @return 
	 */
	Door.prototype.onUse = function(args){
		if(this.focus === true){
			switch(this.open){
				case true:
				  this.open = false;
				  break;
				case false:
				  this.open = true;
				  break;
				default:
				  break;
			}
		}

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
	 * @method onMouseOver
	 * @param {} args
	 * @return 
	 */
	Door.prototype.onMouseOver = function(args){

        // Does this cell have a door?
        // And if so, which side of the cell is the door on?
        var side;
        switch(this.side){
        	case "top":
        	  if(this.top.x === args.cellX && this.top.y === args.cellY){
        	  	side = "top";
        	  } else if(this.bottom.x === args.cellX && this.bottom.y === args.cellY){
        	  	side = "bottom";
        	  } else{
        	  	// the cell selected does not have this door.
        	  	this.focus = false;
        	  	return;
        	  }
        	  break;
        	case "left":
        	  if(this.left.x === args.cellX && this.left.y === args.cellY){
        	  	side = "left";
        	  } else if(this.right.x === args.cellX && this.right.y === args.cellY){
        	  	side = "right";
        	  } else{
        	  	// the cell selected does not have this door.
        	  	this.focus = false;
        	  	return;
        	  }
        	  break;
        	default:
        	  break;
        }

        // Does an agent already have focus in the cell.
        // If so, set door focus to false and return.
		if(args.agents[args.cellY] !== undefined){
			if(args.agents[args.cellY][args.cellX] !== undefined){
				if(args.agents[args.cellY][args.cellX].focus === true){
                    this.focus = false;
                    return;
				}
			}
		}

        // Get the relevant sprite for door location calculations.
        var sprite;
        if(this.open){
        	sprite = gh.assets.sprites[this.images.open];
        } else {
        	sprite = gh.assets.sprites[this.images.closed];
        }

        // Get the bounding rectangle within which the door is located.
        var spriteLocation = {};

		switch(this.side){
			case "left":
			    spriteLocation.left   = (this.left.x * args.cellSize * args.scale) + args.offset.x - (0.5 * sprite.img.height * args.scale);
			    spriteLocation.top    = (this.left.y * args.cellSize * args.scale) + args.offset.y;
			    spriteLocation.right  = (this.left.x * args.cellSize * args.scale) + args.offset.x + (0.5 * sprite.img.height * args.scale);
			    spriteLocation.bottom = (this.left.y * args.cellSize * args.scale) + args.offset.y + (args.cellSize * args.scale);
			    break;
			case "top":
			    spriteLocation.left   = (this.top.x * args.cellSize * args.scale) + args.offset.x;
			    spriteLocation.top    = (this.top.y * args.cellSize * args.scale) + args.offset.y - (0.5 * sprite.img.height * args.scale);
			    spriteLocation.right  = (this.top.x * args.cellSize * args.scale) + args.offset.x + (args.cellSize * args.scale);
			    spriteLocation.bottom = (this.top.y * args.cellSize * args.scale) + args.offset.y +(0.5 * sprite.img.height * args.scale);
			    break;
			default:
			    console.log("error");
			    break;
		}

		if(args.mouseX <= spriteLocation.left || args.mouseX >= spriteLocation.right || args.mouseY <= spriteLocation.top || args.mouseY >= spriteLocation.bottom){
			this.focus = false;
			return;
		}

        // Check if the mouse is actually over the door.
        // This ensures that when we are checking for pixel values nothign outside of the
        // sprite's area is checked.
        var ratiox = args.cellSize / sprite.img.width;
        var ratioy = (sprite.img.height*args.scale) / sprite.img.height;

        var relx = 0;
        var rely = 0;

        var pixel = undefined;

        // Determine wehre the mosue is located within the virtual sprite.
		relx = args.mouseX - spriteLocation.left;
		rely = args.mouseY - spriteLocation.top;
		relx = relx / args.scale;
		rely = rely / args.scale;

        if(side === "left" || side === "right"){
        	pixel = sprite.getPixelColor(rely, relx);
        } else {
        	pixel = sprite.getPixelColor(relx, rely);
        }

		if(!pixel.isTransparent()){
			this.focus = true;
			return;
		} else {
			this.focus = false;
			return;
		}

        this.focus = false;
	};

	/**
	 * Description
	 * @method draw
	 * @param {} context
	 * @param {} x
	 * @param {} y
	 * @param {} size
	 * @param {} scale
	 * @param {} sprites
	 * @param {} side
	 * @return 
	 */
	Door.prototype.draw = function(context, x, y, size, scale, sprites, side){
		context.save();

		//console.log("A");
		//console.log(sprites);
		if(this.open){
			if(this.focus){
				var doorSprite = sprites[this.images.openDoorHighlight];
			} else {
				var doorSprite = sprites[this.images.open];
			}
		} else {
			//console.log("B");
			if(this.focus){
			//	console.log("D");
				var doorSprite = sprites[this.images.closedHighlight];
			} else {
			//	console.log("C");
				var doorSprite = sprites[this.images.closed];
			}
		}

        //console.log("X");
		//console.log(doorSprite);

		switch(side){
			case "top":
				doorSprite.draw(context, x, y - (.5*doorSprite.img.height*scale), doorSprite.img.width * scale, doorSprite.img.height * scale);
			  break;
			case "left":
				context.translate(x, y);
				context.rotate(90*Math.PI/180);
				doorSprite.draw(context, 0 , 0 - (.5*doorSprite.img.height*scale), doorSprite.img.width * scale, doorSprite.img.height * scale);
				break;
			case "right":
				context.translate(x + (size * scale), y);
				context.rotate(90*Math.PI/180);
				doorSprite.draw(context, 0 , 0 - (.5*doorSprite.img.height*scale), doorSprite.img.width * scale, doorSprite.img.height * scale);
				break;
			case "bottom":
				doorSprite.draw(context, x, y - (.5*doorSprite.img.height*scale) + (size * scale), doorSprite.img.width * scale, doorSprite.img.height * scale);
				break;
			default:
			  break;
		}
		
		context.restore();
	};

	gh.Door = Door;

	return gh;
})(gh || {});