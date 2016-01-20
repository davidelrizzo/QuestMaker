/**
 * @module gh
 */

"use strict"

/**
 * @class gh
 */
var gh = (function(gh){

	/**
	 * DESC This class singleton handles the setup phase of the game.
	 *      The user selectes the initial placement of the starting heroes.
	 *      The user might enter through a door, or alternatively, pre-selected
	 *      starting squares.
	 *
	 *      Starting squres: these are highlighted and the user may place a 
	 *      hero by left clicking on them.
	 *
	 *      Starting door: this is more complicated as in reality the player
	 *      moves through it on the first turn.  That is to say it doesn't fit
	 *      within the starting square paradigm and more appropriately belongs in
	 *      the gameState phase of the application.  However, this would then
	 *      require a check to see if the player is on the board every level?
	 *
	 *      Maybe consider rebuilding.  Each player has a starting action sequence
	 *      that should be completed before proceeding to a standard action phase?
	 *
	 *      Eg 
	 *			if play.position !== onBoard
	 *				place at entry location
	 *
	 * @class stateSetup
	 */
	var stateSetup = (function(stateSetup){
		console.log("stateSetup.js loaded");

		/**
		 * Private globals
		 */
		var placed = 0; // The number of heroes placed on the board.

		/**
		 * Public globals
		 */
		stateSetup.msgPump = new stdlib.MessagePump();


		/**
		 * Add message handlers
		 * Setup board visiblity
		 * @method initialize
		 * @return 
		 */
		stateSetup.initialize = function(){
			console.log("initialize");

            // Add the entry trigger message handlers.
            var entryT = gh.ptrActiveLevel.triggers.entry;
            for(var it = 0; it < entryT.length; it++){
            	this.msgPump.addListener("onClick", entryT[it], "onClick");
            }

            // Activte the entry triggers.
            var entryT = gh.ptrActiveLevel.triggers.entry;
            for(var it = 0; it < entryT.length; it++){
            	entryT[it].active = true;
            }
            console.log(entryT);

            this.msgPump.addListener("addPlayer", this, "addPlayer");

            // Add the agent onMouseOver message handlers.
            
            var agents = gh.ptrActiveLevel.agents;
            for(var it = 0; it < agents.length; it++){
            	this.msgPump.addListener("onMouseOver", agents[it], "onMouseOver");
            }


            // Set the initial map visibility
            gh.ptrActiveLevel.map.clearVisibility(gh.ptrActiveLevel.teams);

            // Setup initial visiblity based on line of sight from entry triggers.
            var floor = gh.ptrActiveLevel.map.floor;
            for(var it = 0; it < entryT.length; it++){
				for(var y = 0; y < floor.length; y++){
					for(var x = 0; x < floor[y].length;){
						var line = gh.ptrActiveLevel.map.getLine(entryT[it].x, entryT[it].y, x, y);
						gh.ptrActiveLevel.map.setRayVisibility(line, "Empire", true);
						if(y === 0 || y === (floor.length - 1)){
							x++;
						} else if(x === 0){
							x = floor[y].length - 1;
						} else {
							x++;
						}
					}
				}            	
            }
		};

		/**
		 * Description
		 * @method run
		 * @return Literal
		 */
		stateSetup.run = function(){
			this.update();
			this.render();

			if(placed >= gh.ptrActiveLevel.heroes.length){
				// set the entry triggers to inactive.
				var entryT = gh.ptrActiveLevel.triggers.entry;
				for(var it = 0; it < entryT.length; it++){
					entryT[it].active = false;
				}

				gh.stateGame.initialize();
				return "stateGame";
			}

			return "stateSetup";
		};

		/**
		 * Description
		 * @method update
		 * @return Literal
		 */
		stateSetup.update = function(){
			var selectedCell = gh.display.getMouseToCell(input.mouse.x, input.mouse.y);

			var cell;
			if(gh.ptrActiveLevel.map.floor[selectedCell.y] !== undefined){
				if(gh.ptrActiveLevel.map.floor[selectedCell.y][selectedCell.x] !== undefined){
					cell = gh.ptrActiveLevel.map.floor[selectedCell.y][selectedCell.x];
				} else {
					cell = undefined;
				}
			}

			this.msgPump.postMessage(
				"onMouseOver", 
				{
					"mouseX"    : input.mouse.x, 
				    "mouseY"    : input.mouse.y, 
				    "cellX"     : selectedCell.x, 
				    "cellY"     : selectedCell.y,
				    "cellSize"  : gh.display.cellSize,
				    "scale"     : gh.display.scale,
				    "offset"    : gh.display.offset,
				    "cell"      : cell,
				    "agents"    : gh.ptrActiveLevel.agents
				});

			if(input.mouse.clicked === true){
				this.msgPump.postMessage("onClick", {"mouseX" : input.mouse.x, "mouseY" : input.mouse.y, "cellX" : selectedCell.x, "cellY" : selectedCell.y});
				input.mouse.clicked = false;

				// Has an EntryTrigger been selected?

			}

			if(input.keyboard.isPressed(input.keyboard.PLUS)){
				input.keyboard.key[input.keyboard.PLUS].pressed = false;
				gh.display.scale += 0.05;
			}
			if(input.keyboard.isPressed(input.keyboard.MINUS)){
				input.keyboard.key[input.keyboard.MINUS].pressed = false;
				gh.display.scale -= 0.05;
				if(gh.display.scale < 0.2){
					gh.display.scale = 0.2;
				}
			}

			//if(input.keyboard.key[input.keyboard.UP]){
			if(input.keyboard.isPressed(input.keyboard.UP)){
				gh.display.offset.y -= 5;
			}
			//if(input.keyboard.key[input.keyboard.DOWN]){
			if(input.keyboard.isPressed(input.keyboard.DOWN)){
				gh.display.offset.y += 5;
			}
			//if(input.keyboard.key[input.keyboard.LEFT]){
			if(input.keyboard.isPressed(input.keyboard.LEFT)){
				gh.display.offset.x -= 5;
			}
			//if(input.keyboard.key[input.keyboard.RIGHT]){
			if(input.keyboard.isPressed(input.keyboard.RIGHT)){
				gh.display.offset.x += 5;
			}

			this.msgPump.handleMessages();

			return "stateSetup";
		};

		/**
		 * Draw the visible map
		 * Draw the borders
		 * Draw objects
		 * Draw agents
		 * Draw the grid
		 * @method render
		 * @return 
		 */
		stateSetup.render = function(){
			gh.display.clear();

			// clear the screen to black background.
			
			gh.display.context.save();
			gh.display.context.fillRect(0, 0, gh.display.canvas.width, gh.display.canvas.height);
			gh.display.context.restore();

			gh.ptrActiveLevel.draw(
				gh.display.context, 
				gh.display.scale,
				gh.display.cellSize,
				gh.display.offset, 
				gh.assets.sprites, 
				"Empire");

		};

		/**
		 * DESC
		 *   This function is intended to set the focus of a given cell to
		 *   the object which is beneith the mouse.
		 * NOTE
		 *   This function may be redundant.
		 *   To an extent couple with gh.display.
		 * @method setMouseFocus
		 * @param {Integer} cellX The x coordinate of the cell which the mouse is over.
		 * @param {Integer} cellY The y coordinate of the cell which the mouse is over.
		 * @param {Integer} mouseX The x coordinate of the mouse cursor on the screen.
		 * @param {Integer} mouseY The y coordinate of the mouse cursor on the screen.
		 * @return 
		 */
		stateSetup.setMouseFocus = function(cellX, cellY, mouseX, mouseY){
			// 1> check agent
			// 2> check object
			// 3> check border
			// 4> set tile focus
			if(gh.ptrActiveLevel.agents[cellY] !== undefined){
				//var target = gh.ptrActiveLevel.map.getAgentsAt(cellY, cellX);
				var target = gh.ptrActiveLevel.map.floor[cellY, cellX].agents;
				for(var it = 0; it < target.length; it++){
					if(target[it] !== undefined){
						if(target[it].isMouseOver(
							cellX, 
							cellY, 
							mouseX, 
							mouseY, 
							gh.display.cellSize, 
							gh.display.offset, 
							gh.display.scale)){
		                    
		                    target[it].focus = true;
						} else {
							target[it].focus = false;
						}
					}
				}
			}
		} 	


		/**
		 * Description
		 * @event addPlayer
		 * @method addPlayer
		 * @param {Integer} args.y
		 * @return 
		 */
		stateSetup.addPlayer = function(args){

			// get a hero to place
			if(gh.ptrActiveLevel.heroes !== undefined){
				var it = 0;
				while(gh.ptrActiveLevel.heroes[it].position !== undefined){
					it++;
				}

				var hero = gh.ptrActiveLevel.heroes[it];

				// Check if a hero is alread on the board.
				// If so, remove that one.
				//var agents = gh.ptrActiveLevel.map.getAgentsAt(args.x, args.y);
				var agents = gh.ptrActiveLevel.map.floor[args.y][args.x].agents;

				for(var c = 0; c < gh.ptrActiveLevel.agents.length; c++){
					if(gh.ptrActiveLevel.agents[c].position.x === args.x && gh.ptrActiveLevel.agents[c].position.y === args.y){
						gh.ptrActiveLevel.agents[c].position = undefined;
						gh.ptrActiveLevel.agents.splice(c, 1);
						c--;
						placed--;
					}
				}

				hero.position = {};
				hero.position.x = args.x;
				hero.position.y = args.y;

				gh.ptrActiveLevel.agents.unshift(hero);

				gh.ptrActiveLevel.map.floor[args.y][args.x].agents = gh.ptrActiveLevel.map.floor[args.y][args.x].agents || [];
				gh.ptrActiveLevel.map.floor[args.y][args.x].agents.push(hero);

				placed++;
			}
		};


		return stateSetup;		
	})(stateSetup || {});

	gh.stateSetup = stateSetup;
	return gh;
})(gh || {});