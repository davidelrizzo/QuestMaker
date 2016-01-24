/**
 * DESCRIPTION
 *        assets.js contains methods which relate to loading and manipulating game
 *        resources, specifically music and graphic assets.  These should be loaded
 *        prior to running a level and removed once the level is complete.  
 *
 * TO CONSIDER
 *        At present, as the assets are loaded after the other game data, game objects 
 *        which interact with the assets for drawing or playing music rely on some 
 *        knowledge of the assets structures, and are thus coupled.  E.g. a cell has
 *        a sprite "name" value which indexes the correct sprite to draw in the asset
 *        sprite object.  It would be better for the cell to have a pointer variable
 *        to that sprite object.
 *
 * @module gh
 */

"use strict"

/** 
 * @class gh
 */
var gh = (function(gh){

	/**
	 * @class assets
	 */
	var assets = (function(assets){

		/**
		 * Description
		 * @method loadMapSprites
		 * @param {} jsonMap
		 * @param {} directory
		 * @return 
		 */
		assets.loadMapSprites = function(jsonMap, directory){
			this.sprites = this.sprites || {};

			for(var y = 0; y < jsonMap.floor.length; y++){
				for(var x = 0; x < jsonMap.floor[y].length; x++){
					if(jsonMap.floor[y][x].sprite !== undefined){
						this.sprites[jsonMap.floor[y][x].sprite] = new graphics.Sprite(directory + jsonMap.floor[y][x].sprite);
					}
				}
			}
		};

		/**
		 * Description
		 * @method loadStdGraphics
		 * @param {} jsonStdGraphics
		 * @param {} directory
		 * @return 
		 */
		assets.loadStdGraphics = function(jsonStdGraphics, directory){
			this.sprites = this.sprites || {};

			// Load the door graphics
			if(jsonStdGraphics.door !== undefined){
				this.sprites[jsonStdGraphics.door.closed] = new graphics.Sprite(directory + jsonStdGraphics.door.closed);
				this.sprites[jsonStdGraphics.door.closedHighlight] = new graphics.Sprite(directory + jsonStdGraphics.door.closedHighlight);
				this.sprites[jsonStdGraphics.door.open] = new graphics.Sprite(directory + jsonStdGraphics.door.open);
				this.sprites[jsonStdGraphics.door.openDoorHighlight] = new graphics.Sprite(directory + jsonStdGraphics.door.openDoorHighlight);
			}
		};

		/**
		 * Description
		 * @method loadAgentSprites
		 * @param {} jsonAgents
		 * @param {} directory
		 * @return 
		 */
		assets.loadAgentSprites = function(jsonAgents, directory){
			this.sprites = this.sprites || {};

			for(var key in jsonAgents){
				var agent = jsonAgents[key].sprites;
				for(var img in agent){
					this.sprites[agent[img]] = new graphics.Sprite(directory + agent[img]);
				}
			}
		};

		/**
		 * Description
		 * @method loadDiceSprites
		 * @param {String} directory The path in which the image of the dice is located.  This should be a sprite sheet with each side fo the die depicted.
		 * @param {String} name The name of the image in the directory.
		 * @return 
		 */
		assets.loadDiceSprites = function(directory, name){
			this.sprites = this.sprites || {};

			this.sprites[name] = new graphics.Sprite(directory + name);
		};

		assets.loadWeaponSprites = function(weaponTemplates, directory){
			this.sprites = this.sprites || {};

			for(var key in weaponTemplates){
				var weapon = weaponTemplates[key].sprite;
				if(weapon !== undefined){
					this.sprites[weapon] = new graphics.Sprite(directory + weapon);
				}
			}
		}

		return assets;
	})(assets || {});
	
	gh.assets = assets;
	return gh;
})(gh || {});