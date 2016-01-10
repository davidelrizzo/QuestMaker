"use strict"

var gh = (function(gh){
	console.log("stateGame.js loaded");

	var stateGame = (function(stateGame){

		stateGame.msgPump = new stdlib.MessagePump();

		stateGame.initialize = function(){

		};

		stateGame.run = function(){
			this.update();
			this.render();

			return "stateGame";
		};

		stateGame.update = function(){
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

			if(input.keyboard.key[input.keyboard.PLUS]){
				gh.display.scale += 0.05;
			}
			if(input.keyboard.key[input.keyboard.MINUS]){
				gh.display.scale -= 0.05;
				if(gh.display.scale < 0.2){
					gh.display.scale = 0.2;
				}
			}
			if(input.keyboard.key[input.keyboard.UP]){
				gh.display.offset.y -= 5;
			}
			if(input.keyboard.key[input.keyboard.DOWN]){
				gh.display.offset.y += 5;
			}
			if(input.keyboard.key[input.keyboard.LEFT]){
				gh.display.offset.x -= 5;
			}
			if(input.keyboard.key[input.keyboard.RIGHT]){
				gh.display.offset.x += 5;
			}

			this.msgPump.handleMessages();

			return "stateGame";

		};

		stateGame.render = function(){
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

			gh.ptrActiveLevel.map.drawGrid(
				gh.display.canvas, 
				gh.display.context, 
				gh.display.scale, 
				gh.display.offset);

		};

		return stateGame;
	})(stateGame || {});

    gh.stateGame = stateGame;
	return gh;
})(gh || {});