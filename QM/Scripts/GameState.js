/**
 * File: GameState.js
 * Desc:
 * Todo:
 *		-> Ensure that the sprites drawn are centered with respect to tileSize if the
 *		   image is an irregular height or width
 *		-> Render objects and traps
 *		-> Render lighting effects if required
 */

"use strict"

var QM = (function(QM){
	
	function GameState(canvas, context){
		QM.QMState.call(this);

		this.canvas = canvas;
		this.context = context;
		this.stoneTexture = LoadImage("./Images/seamless_tiled_stone_texture_by_lendrick.jpg");

		this.tileSize = 64;
		this.gridScale = .8;
		this.viewPort = {"x" : 0, "y" : 0};
		this.MOVE_RATE = 5;

		this.selectedCell = {}; // {"x" : , "y" ; }
	}
	GameState.prototype = Object.create(QM.QMState.prototype);

	GameState.prototype.update = function(){
		// Identify mouse input
		if(QM.Mouse.mouseDown === true){
			var x = Math.floor(QM.Mouse.mousex / this.tileSize);			
			var y = Math.floor(QM.Mouse.mousey / this.tileSize);
		}

		// Handle keyboard input
		if(QM.Input.keyboard.keys[QM.Input.key.up]){
			this.viewPort.y -= this.MOVE_RATE;
		}
		if(QM.Input.keyboard.keys[QM.Input.key.right]){
			this.viewPort.x += this.MOVE_RATE;
		}
		if(QM.Input.keyboard.keys[QM.Input.key.down]){
			this.viewPort.y += this.MOVE_RATE;
		}
		if(QM.Input.keyboard.keys[QM.Input.key.left]){
			this.viewPort.x -= this.MOVE_RATE;
		}

		//console.log("viewPort: " + this.viewPort.x + " : " + this.viewPort.y + " mouse " + QM.Mouse.mousex + " : " + QM.Mouse.mousey);

		/** PSEUDO CODE **
		 * Check 
		 * ActiveGameData.currentPlayersTurn()
		 */

		if(QM.activeGameData.getActiveCreature().hasActions()){
			console.log(QM.activeGameData.getActiveCreature());
			if(QM.Mouse.mouseDown){
				// Handle input
				var cell = this.getMouseCellLocation();
				this.selectedCell = cell;
				console.log(cell);
			}
		}
		

		return "gameState";
	};

	GameState.prototype.render = function(){
		//this.width = document.body.clientWidth;
		//this.height = document.body.clientHeight;
		this.canvas.width = 640;
		this.canvas.height = 480;
		QM.Canvas2D.clearCanvas();

		// black background.
		this.context.fillStyle = "#000000";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.printMap();
		//this.printMouseLocation();
		this.printSelectedCell();

	};

	GameState.prototype.printMap = function(){
		this.printGrid();
		this.printFloor();
		this.printBorder();
		
		// Print Objects and Traps

		this.printCreatures();

		// Lighting Effects
	};

	GameState.prototype.printGrid = function(){

		this.context.lineWidth = 1;
		this.context.strokeStyle = "grey";

		for(var y = 0; y < this.canvas.height; y+=(64*this.gridScale)){
			this.context.beginPath();
			this.context.moveTo(0, y + (this.viewPort.y % this.tileSize * this.gridScale));
			this.context.lineTo(this.canvas.width, y + this.viewPort.y % this.tileSize * this.gridScale);
			this.context.stroke();
		}

		for(var x = 0; x < this.canvas.width; x+=(64*this.gridScale)){
			this.context.beginPath();
			this.context.moveTo(x + this.viewPort.x % this.tileSize * this.gridScale, 0);
			this.context.lineTo(x + this.viewPort.x % this.tileSize * this.gridScale, this.canvas.height);
			this.context.stroke();
		}
	};

	GameState.prototype.printFloor = function(){
		//var map =  QM.activeGameData.campaign.levels[QM.activeGameData.activeLevel].mapData.map;
		var map = QM.activeGameData.activeMap.map;

		for(var y = 0; y < map.length; y++){
			for(var x = 0; x < map[y].length; x++){
				if(map[y][x].visible !== false && map[y][x].id !== undefined){
					QM.Canvas2D.drawImage(
						QM.activeGameData.activeMapSprites[map[y][x].id],
						{ 
							x : (x * this.tileSize + this.viewPort.x) * this.gridScale,
							y : (y * this.tileSize + this.viewPort.y) * this.gridScale
						},
						map[y][x].rotation,
						{x : 0, y : 0},
						this.gridScale
					);
				}		
			}
		}
	};

	GameState.prototype.printBorder = function(){
		//var map =  QM.activeGameData.campaign.levels[QM.activeGameData.activeLevel].mapData.map;
		var map = QM.activeGameData.activeMap.map;

		for(var y = 0; y < map.length; y++){
			for(var x = 0; x < map[y].length; x++){
				if(map[y][x].visible !== false && map[y][x].border !== undefined){
					// Print the walls
					if(map[y][x].border.wall !== undefined){
						for(var w = 0; w < map[y][x].border.wall.length; w ++){
							switch (map[y][x].border.wall[w]){
								case "top":
									this.context.beginPath();
									this.context.lineWidth = 10*this.gridScale;
									this.context.strokeStyle = "white";
									this.context.moveTo((x*this.tileSize + this.viewPort.x) * this.gridScale, (y * this.tileSize + this.viewPort.y) * this.gridScale);
									this.context.lineTo((x*this.tileSize + this.tileSize+this.viewPort.x) * this.gridScale, (y * this.tileSize + this.viewPort.y) * this.gridScale);
									this.context.stroke();
									break;
								case "right":
									this.context.beginPath();
									this.context.lineWidth = 10*this.gridScale;
									this.context.strokeStyle = "white";
									this.context.moveTo((x*this.tileSize + this.tileSize + this.viewPort.x) * this.gridScale, (y*this.tileSize + this.viewPort.y) * this.gridScale);
									this.context.lineTo((x*this.tileSize + this.viewPort.x + this.tileSize) * this.gridScale, (y*this.tileSize + this.viewPort.y + this.tileSize)*this.gridScale)
									this.context.stroke();
									break;
								case "bottom":
									this.context.beginPath();
									this.context.lineWidth = 10*this.gridScale;
									this.context.strokeStyle = "white";
									this.context.moveTo((x * this.tileSize + this.viewPort.x) * this.gridScale, (y * this.tileSize + this.viewPort.y + this.tileSize) * this.gridScale);
									this.context.lineTo((x * this.tileSize + this.viewPort.x + this.tileSize) * this.gridScale, (y * this.tileSize + this.viewPort.y + this.tileSize) * this.gridScale);
									this.context.stroke();
									break;
								case "left":
									this.context.beginPath();
									this.context.lineWidth = 10*this.gridScale;
									this.context.strokeStyle = "white";
									this.context.moveTo((x * this.tileSize + this.viewPort.x) * this.gridScale, (y * this.tileSize + this.viewPort.y) * this.gridScale);
									this.context.lineTo((x * this.tileSize + this.viewPort.x) * this.gridScale, (y * this.tileSize + this.viewPort.y + this.tileSize) * this.gridScale);
									this.context.stroke();
									break;
								default:
									console.log("Unexpected wall identifier");
									break;
							}
						}
					}

					// Print the doors
					if(map[y][x].border.door !== undefined){
						this.printDoors(map, x, y);
					}
				}
			}
		}		
	};

	GameState.prototype.printDoors = function(map, x, y){
		var sprite;
		for(var d = 0; d < map[y][x].border.door.length; d++){
			sprite = QM.activeGameData.activeMapSprites[map[y][x].border.door[d].id];
			switch(map[y][x].border.door[d].side){
				case "top":
					this.context.save();
					this.context.drawImage(
						sprite,
						0, 0, sprite.width, sprite.height,
						(x * this.tileSize + this.viewPort.x) * this.gridScale, 
						(y * this.tileSize + this.viewPort.y - (.5 * sprite.height)) * this.gridScale,
						sprite.width * this.gridScale, 
						sprite.height * this.gridScale
					);
					this.context.restore();
					break;
				case "right":
					var offsetx = sprite.width/2 * this.gridScale;
					var offsety = sprite.height/2 * this.gridScale;

					this.context.save();
					this.context.translate((x * this.tileSize + this.viewPort.x) * this.gridScale, (y * this.tileSize + this.viewPort.y ) * this.gridScale);
					this.context.rotate(90*Math.PI/180);

					this.context.drawImage(sprite, 
						0, 0, sprite.width, sprite.height,
						0, -this.tileSize * this.gridScale - offsety,
						sprite.width * this.gridScale, sprite.height * this.gridScale);

					this.context.restore();
					break;
				case "bottom":
					this.context.save();
					this.context.drawImage(
						sprite,
						0, 0, sprite.width, sprite.height,
						(x * this.tileSize + this.viewPort.x) * this.gridScale, (y * this.tileSize + this.viewPort.y + this.tileSize - (.5 * sprite.height)) * this.gridScale,
						sprite.width * this.gridScale, sprite.height * this.gridScale
						);
					this.context.restore();
					break;
				case "left":
					var offsetx = sprite.width/2 * this.gridScale;
					var offsety = sprite.height/2 * this.gridScale;

					this.context.save();
					this.context.translate((x * this.tileSize + this.viewPort.x) * this.gridScale, (y * this.tileSize + this.viewPort.y) * this.gridScale);
					this.context.rotate(90*Math.PI/180);

					this.context.drawImage(sprite, 
						0, 0, sprite.width, sprite.height,
						0, -offsety,
						sprite.width*this.gridScale, sprite.height*this.gridScale);

					this.context.restore();
					break;
				default:
					break;
			}
		}		
	}

	GameState.prototype.printCreatures = function(){
		for(var team = 0; team < QM.activeGameData.creatures.length; team++){
			for(var creature = 0; creature < QM.activeGameData.creatures[team].length; creature++){
				var x = QM.activeGameData.creatures[team][creature].posX;
				var y = QM.activeGameData.creatures[team][creature].posY;
				if(QM.activeGameData.activeCreatureSprites[QM.activeGameData.creatures[team][creature].templateID] !== undefined){
					var map =  QM.activeGameData.campaign.levels[QM.activeGameData.activeLevel].mapData.map;
					if(map[y][x].visible !== false){
						QM.Canvas2D.drawImage(
							QM.activeGameData.activeCreatureSprites[QM.activeGameData.creatures[team][creature].templateID],
							{x : (x * this.tileSize + this.viewPort.x ) * this.gridScale, y: (y * this.tileSize + this.viewPort.y ) * this.gridScale},
							0,
							{x:0, y:0},
							this.gridScale
						);
					}
				}
			}
		}
	};

	GameState.prototype.getMouseCellLocation = function(){
		var x = Math.floor((QM.Mouse.mousex - (this.viewPort.x * this.gridScale)) / (this.tileSize * this.gridScale));
		var y = Math.floor((QM.Mouse.mousey - (this.viewPort.y * this.gridScale)) / (this.tileSize * this.gridScale));

		return {"x" : x, "y" : y};
	};

	GameState.prototype.printMouseLocation = function(){
		var tileDim = this.tileSize*this.gridScale;

		var cell = this.getMouseCellLocation();

		this.context.beginPath();
		this.context.rect(
			(cell.x * this.tileSize + this.viewPort.x) * this.gridScale,
			(cell.y * this.tileSize + this.viewPort.y) * this.gridScale,
			tileDim,
			tileDim
		);
		this.context.fillStyle = "blue";
		this.context.globalAlpha = 0.4;
		this.context.fill();
		this.context.globalAlpha = 1.0;
	};

	GameState.prototype.printSelectedCell = function(){
		var tileDim = this.tileSize*this.gridScale;

		if(this.selectedCell === {}){
			return;
		}

		this.context.beginPath();
		this.context.rect(
			(this.selectedCell.x * this.tileSize + this.viewPort.x) * this.gridScale,
			(this.selectedCell.y * this.tileSize + this.viewPort.y) * this.gridScale,
			tileDim,
			tileDim
		);
		this.context.fillStyle = "blue";
		this.context.globalAlpha = 0.4;
		this.context.fill();
		this.context.globalAlpha = 1.0;
	};

	QM.GameState = GameState;
	return QM;
})(QM || {});