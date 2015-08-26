"use strict"

var QM = (function(QM){

	function ActiveGameData(campaign){
		this.campaign = campaign;
		this.activeLevel = 0;
		this.activeMapSprites = [];


		this.activeTeam = 0;
		this.activeCreature = 0;
		this.activeCreatureSprites = {};
		this.turn = 0;

		this.creatures = loadCreatures(this.campaign, this.activeLevel);

		initializeBoardVisiblity(this.campaign.levels[this.activeLevel].mapData.map);
	};

	function loadCreatures(campaign, activeLevel){
		var creatures = [];
		var cTemplate = campaign.creatureTemplates;

		for(var n = 0; n < campaign.levels[activeLevel].teams.length; n++){
			creatures[n] = [];
			for(var c = 0; c < campaign.levels[activeLevel].teams[n].creatures.length; c++){
				creatures[n][c] 						= new QM.API.Creature();
				creatures[n][c].team 				= campaign.levels[activeLevel].teams[n].name;
				creatures[n][c].templateID	= campaign.levels[activeLevel].teams[n].creatures[c].templateID;
				creatures[n][c].name 				= cTemplate[campaign.levels[activeLevel].teams[n].creatures[c].templateID].name
				creatures[n][c].body.base 	= cTemplate[campaign.levels[activeLevel].teams[n].creatures[c].templateID].body
				creatures[n][c].mind.base 	= cTemplate[campaign.levels[activeLevel].teams[n].creatures[c].templateID].mind;
				creatures[n][c].attackDice 	= cTemplate[campaign.levels[activeLevel].teams[n].creatures[c].templateID].attackDice;
				creatures[n][c].defendDice 	= cTemplate[campaign.levels[activeLevel].teams[n].creatures[c].templateID].defendDice;
				creatures[n][c].moveDice 		= cTemplate[campaign.levels[activeLevel].teams[n].creatures[c].templateID].moveDice;
				creatures[n][c].moveTotal 	= cTemplate[campaign.levels[activeLevel].teams[n].creatures[c].templateID].moveTotal;
				//creatures[n][c].leftHand	= undefined;
				//creatures[n][c].rightHand	= undefined;
				//creaures[n][c].chest			= undefined;
				//creatures[n][c].head			= undefined;
				creatures[n][c].posX 				= campaign.levels[activeLevel].teams[n].creatures[c].posX;
				creatures[n][c].posY 				= campaign.levels[activeLevel].teams[n].creatures[c].posY;
				
				if(creatures[n][c].team == "Zargon"){
					creatures[n][c].active = false;
				} else {
					creatures[n][c].active = true;
				}

				console.log(creatures[n][c].team);
			}
		}

		return creatures;
	}

	ActiveGameData.prototype.loadMapSprites = function(){
		var len = this.campaign.levels[this.activeLevel].mapData.spriteIndex.length;
		for(var x = 0; x < len; x++){
			try{
				this.activeMapSprites[x] = LoadImage(this.campaign.levels[this.activeLevel].mapData.spriteIndex[x]);
			} catch (e) { console.log(e); };
		}
	};

	ActiveGameData.prototype.loadCreatureSprites = function(){
		for(var key in this.campaign.creatureTemplates){
			this.activeCreatureSprites[key] = LoadImage(this.campaign.creatureTemplates[key].sprite);
		}
	}

	function initializeBoardVisiblity(map){
		for(var y = 0; y < map.length; y++){
			for(var x = 0; x < map[y].length; x++){
				map[y][x].visible = false;
			}
		}
	}

	QM.ActiveGameData = ActiveGameData;
	return QM;
})(QM || {});