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
	}
	GameState.prototype = Object.create(QM.QMState.prototype);

	GameState.prototype.update = function(){
		console.log(QM.activeGameData);

		// Identify mouse input
		if(QM.Mouse.mouseDown === true){
			var x = Math.floor(QM.Mouse.mousex / this.tileSize);			
			var y = Math.floor(QM.Mouse.mousey / this.tileSize);
		}

		console.log(QM.activeGameData.activeTile);

		/** PSEUDO CODE **
		 * Check 
		 * ActiveGameData.currentPlayersTurn()
		 */
		return "gameState";
	};

	GameState.prototype.render = function(){
		this.width = document.body.clientWidth;
		this.height = document.body.clientHeight;
		QM.Canvas2D.clearCanvas();

		// black background.
		this.context.fillStyle = "#000000";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.printMap();

	};

	GameState.prototype.printGrid = function(){

		this.context.lineWidth = 1;
		this.context.strokeStyle = "grey";

		for(var y = 0; y < this.canvas.height; y+=(64*this.gridScale)){
			this.context.beginPath();
			this.context.moveTo(0, y);
			this.context.lineTo(this.canvas.width, y);
			this.context.stroke();
		}

		for(var x = 0; x < this.canvas.width; x+=(64*this.gridScale)){
			this.context.beginPath();
			this.context.moveTo(x, 0);
			this.context.lineTo(x, this.canvas.height);
			this.context.stroke();
		}
	};

	GameState.prototype.printFloor = function(){
		var map =  QM.activeGameData.campaign.levels[QM.activeGameData.activeLevel].mapData.map;

		for(var y = 0; y < map.length; y++){
			for(var x = 0; x < map[y].length; x++){
				if(map[y][x].visible !== false && map[y][x].id !== undefined){
					QM.Canvas2D.drawImage(
						QM.activeGameData.activeMapSprites[map[y][x].id],
						{x: x*this.tileSize*this.gridScale, y: y*this.tileSize*this.gridScale},
						map[y][x].rotation,
						{x : 0, y : 0},
						this.gridScale
					);
				}		
			}
		}
	};

	GameState.prototype.printBorder = function(){
		var map =  QM.activeGameData.campaign.levels[QM.activeGameData.activeLevel].mapData.map;

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
									this.context.moveTo(x*this.tileSize*this.gridScale, y*this.tileSize*this.gridScale);
									this.context.lineTo(x*this.tileSize*this.gridScale + (this.tileSize*this.gridScale), y*this.tileSize*this.gridScale);
									this.context.stroke();
									break;
								case "right":
									this.context.beginPath();
									this.context.lineWidth = 10*this.gridScale;
									this.context.strokeStyle = "white";
									this.context.moveTo(x*this.tileSize*this.gridScale + this.tileSize*this.gridScale, y*this.tileSize*this.gridScale);
									this.context.lineTo(x*this.tileSize*this.gridScale + this.tileSize*this.gridScale, y*this.tileSize*this.gridScale + this.tileSize*this.gridScale);
									this.context.stroke();
									break;
								case "bottom":
									this.context.beginPath();
									this.context.lineWidth = 10*this.gridScale;
									this.context.strokeStyle = "white";
									this.context.moveTo(x*this.tileSize*this.gridScale, y*this.tileSize*this.gridScale + this.tileSize*this.gridScale);
									this.context.lineTo(x*this.tileSize*this.gridScale + this.tileSize*this.gridScale, y*this.tileSize*this.gridScale + this.tileSize*this.gridScale);
									this.context.stroke();
									break;
								case "left":
									this.context.beginPath();
									this.context.lineWidth = 10*this.gridScale;
									this.context.strokeStyle = "white";
									this.context.moveTo(x*this.tileSize*this.gridScale, y*this.tileSize*this.gridScale);
									this.context.lineTo(x*this.tileSize*this.gridScale, y*this.tileSize*this.gridScale + this.tileSize*this.gridScale);
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
						var sprite;
						for(var d = 0; d < map[y][x].border.door.length; d++){
							switch(map[y][x].border.door[d].side){
								case "top":
									break;
								case "right":
									break;
								case "bottom":
									this.context.save();
									sprite = QM.activeGameData.activeMapSprites[map[y][x].border.door[d].id];
									this.context.drawImage(
										sprite,
										0, 0, sprite.width, sprite.height,
										x*this.tileSize*this.gridScale, (y*this.tileSize+50)*this.gridScale,
										sprite.width * this.gridScale, sprite.height * this.gridScale
										);
									this.context.restore();
									break;
								case "left":
									sprite = QM.activeGameData.activeMapSprites[map[y][x].border.door[d].id];

									var offsetx = sprite.width/2*this.gridScale;
									var offsety = sprite.height/2*this.gridScale;

									this.context.save();
									this.context.translate(x*this.tileSize*this.gridScale, y*this.tileSize*this.gridScale);
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
				}
			}
		}		
	};

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
							{x : x*this.tileSize*this.gridScale, y: y*this.tileSize*this.gridScale},
							0,
							{x:0, y:0},
							this.gridScale
						);
					}
				}
			}
		}
	};

	GameState.prototype.printMouseLocation = function(){
		var tileDim = this.tileSize*this.gridScale;
		var x = Math.floor(QM.Mouse.mousex / tileDim);
		var y = Math.floor(QM.Mouse.mousey / tileDim);

		this.context.beginPath();
		this.context.rect(x*tileDim, y*tileDim,tileDim,tileDim);
		this.context.fillStyle = "blue";
		this.context.globalAlpha = 0.4;
		this.context.fill();
		this.context.globalAlpha = 1.0;
	};

	GameState.prototype.printMap = function(){
		this.printGrid();
		this.printFloor();
		this.printBorder();
		
		// Print Objects and Traps

		this.printCreatures();

		// Lighting Effects

		this.printMouseLocation();
	};

	QM.GameState = GameState;
	return QM;
})(QM || {});