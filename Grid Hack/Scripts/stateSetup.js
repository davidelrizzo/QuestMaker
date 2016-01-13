/**
 * FILE stateSetup.js
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
 */

"use strict"

var gh = (function(gh){

	var stateSetup = (function(stateSetup){
		console.log("stateSetup.js loaded");

		var placed = 0; // The number of heroes placed on the board.

		stateSetup.msgPump = new stdlib.MessagePump();


		/**
		 * o Add message handlers
		 * o Setup board visiblity
		 */
		stateSetup.initialize = function(){
			console.log("initialize");

            // Add the entry trigger message handlers.
            var entryT = gh.ptrActiveLevel.triggers.entry;
            for(var it = 0; it < entryT.length; it++){
            	this.msgPump.addListener("onClick", entryT[it], "onClick");
            }

            this.msgPump.addListener("addPlayer", this, "addPlayer");

            // get a list of doors.
            /*
            var doors = gh.ptrActiveLevel.map.getDoors();
            for(var it = 0; it < doors.length; it++){
            	this.msgPump.addListener("onMouseOver", doors[it], "onMouseOver");
            }
            */

            // Add the agent onMouseOver message handlers.
            
            var agents = gh.ptrActiveLevel.agents;
            for(var y = 0; y < agents.length; y++){
            	if(agents[y] !== undefined){
            		for(var x = 0; x < agents[y].length; x++){
            			if(agents[y][x] !== undefined){
            				this.msgPump.addListener("onMouseOver", agents[y][x], "onMouseOver");
            			}
            		}
            	}
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

		stateSetup.run = function(){
			this.update();
			this.render();

			if(placed >= gh.ptrActiveLevel.heroes.length){
				// setup turn order.

				gh.ptrActiveLevel.turnOrder = new gh.TurnOrder(["Empire", "Zargon"]);
				gh.ptrActiveLevel.players = {
					"Empire" : new gh.Player("Chris", "Empire", gh.ptrActiveLevel.heroes),
					"Zargon" : new gh.Computer("Zargon", undefined)
				};

				gh.stateGame.initialize();
				return "stateGame";
			}

			return "stateSetup";
		};

		/**
		 * DESC
		 *   This function is intended to set the focus of a given cell to
		 *   the object which is beneith the mouse.
		 * NOTE
		 *   This function may be redundant.
		 *   To an extent couple with gh.display.
		 */
		stateSetup.setMouseFocus = function(cellX, cellY, mouseX, mouseY){
			// 1> check agent
			// 2> check object
			// 3> check border
			// 4> set tile focus
			if(gh.ptrActiveLevel.agents[cellY] !== undefined){
				var target = gh.ptrActiveLevel.agents[cellY][cellX];
				if(target !== undefined){
					if(target.isMouseOver(
						cellX, 
						cellY, 
						mouseX, 
						mouseY, 
						gh.display.cellSize, 
						gh.display.offset, 
						gh.display.scale)){
	                    
	                    target.focus = true;
					} else {
						target.focus = false;
					}
				}
			}
		} 	

		stateSetup.update = function(){
			var selectedCell = gh.display.getMouseToCell(input.mouse.x, input.mouse.y);

			console.log("update");

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

		stateSetup.addPlayer = function(args){
			console.log("addPlayer");
			console.log(args);

			// get a hero to place
			if(gh.ptrActiveLevel.heroes !== undefined){
				var it = 0;
				while(gh.ptrActiveLevel.heroes[it].position !== undefined){
					it++;
				}
				var hero = gh.ptrActiveLevel.heroes[it];

				// Check if a hero is alread on the board.
				// If so, remove that one.
				if(gh.ptrActiveLevel.agents !== undefined){
					if(gh.ptrActiveLevel.agents[args.y] !== undefined){
						if(gh.ptrActiveLevel.agents[args.y][args.x] !== undefined){
							console.log("occupied");

							gh.ptrActiveLevel.agents[args.y][args.x].position = undefined;
							gh.ptrActiveLevel.agents[args.y][args.x] = undefined;

							placed--;
						}
					}
				}

				hero.position = {};
				hero.position.x = args.x;
				hero.position.y = args.y;

				gh.ptrActiveLevel.agents = gh.ptrActiveLevel.agents || [];
				gh.ptrActiveLevel.agents[args.y] = gh.ptrActiveLevel.agents[args.y] || [];
				gh.ptrActiveLevel.agents[args.y][args.x] = hero;

				placed++;
			}
		};

		stateSetup.render = function(){
			// Draw visible map
			// Draw borders
			// Draw objects
			// Draw agents
			gh.display.clear();

			gh.display.context.save();
			gh.display.context.fillRect(0, 0, gh.display.canvas.width, gh.display.canvas.height);
			gh.display.context.restore();
						
			gh.ptrActiveLevel.map.drawFloor(
				gh.display.context, 
				gh.display.scale, 
				gh.display.offset, 
				gh.assets.sprites,
				"Empire");

			gh.ptrActiveLevel.drawAgents(
				gh.display.context,
				gh.display.scale,
				gh.display.cellSize,
				gh.display.offset,
				"Empire");

			gh.ptrActiveLevel.drawEntryTriggers(
				gh.display.context, 
				gh.display.scale, 
				gh.display.cellSize, 
				gh.display.offset);

			gh.ptrActiveLevel.map.drawGrid(
				gh.display.canvas, 
				gh.display.context, 
				gh.display.scale, 
				gh.display.offset);
			
		};

		stateSetup.setupTurnOrder = function(){
			gh.ptrActiveLevel.turnOrder = {
				"player" : gh.ptrActiveLevel.heroes, // List of heroes.
				"agnets" : undefined
			};
		};
	
		return stateSetup;		
	})(stateSetup || {});

	gh.stateSetup = stateSetup;
	return gh;
})(gh || {});