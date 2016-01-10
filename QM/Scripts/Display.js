"use strict"

var gh = (function(gh){


	function display(canvas, context, mapData){
		this.canvas = canvas;
		this.context = context;

		this.scale		= 1;
		this.tileSize	= 64;
		this.offset		= {"x" : 0, "y" : 0};
		this.origin		= {"x" : 0, "y" : 0};

		this.sprites 	= buildSpriteList();
	}

	display.prototype.drawMap(){

	}

	function buildSpriteList(mapData, heroes, path){
		var fileList 			= [];	// list of unique sprite names (removes duplicates from the map).
		var spriteList 		= []; // list of image sprite objects built from the fileList.

		// First build a list of unique sprite names.
		for(var y = 0; y < mapData.map.length; y++){
			for(var x = 0; x < mapData.map[y].length; x++){
				if(fileList.length == 0){
					if(mapData.map[y][x].img !== undefined){
						fileList.push(mapData.map[y][x].img);
					}
				} else {
					for(var it = 0; it < fileList.length && mapData.map[y][x].img !== fileList[it]; it++){
					}
					if(it >= fileList.length){
						if(mapData.map[y][x].img !== undefined){
							fileList.push(mapData.map[y][x].img);
						}
					}
				}
			}
		}

		// Then load the images from the fileList
		for(var x = 0; x < fileList.length; x++){
			var img = new Image();
			img.src = path + "Floor Tiles/" + fileList[x];
			//spriteList.push(img);
			spriteList[fileList[x]] = img;
		}

		// add heroes to the sprite list
		var keys = Object.keys(heroes);
		
		for(var it = 0; it < keys.length; it++){
			var img = new Image();
			img.src = path + "Creatures/" + heroes[keys[it]].sprite;
			spriteList[keys[it]] = img;
		}

		return spriteList;
	}


	return gh
})(gh || {});