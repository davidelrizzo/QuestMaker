"use strict"

var QM = (function(QM){

	function ActiveGameData(){
		this.gameData = undefined;
		this.activeLevel = undefined;
		this.activeMapSprites = [];
	};

	ActiveGameData.prototype.setupData = function(jsonCampaignDataPath){
		try{
			this.gameData = JSON.parse(getAJAX(jsonCampaignDataPath));
		} catch (e) {
			console.log(e);
		};
	};

	ActiveGameData.prototype.loadMapSprites = function(){
		var len = this.gameData.levels[this.activeLevel].mapData.spriteIndex.length;
		console.log(len);
		for(var x = 0; x < len; x++){
			try{
				this.activeMapSprites[x] = LoadImage(this.gameData.levels[this.activeLevel].mapData.spriteIndex[x]);
			} catch (e) { console.log(e); };
		}
	};

	QM.ActiveGameData = ActiveGameData;
	return QM;
})(QM || {});