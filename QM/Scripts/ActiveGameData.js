"use strict"

var QM = (function(QM){

	function ActiveGameData(campaign){
		this.campaign = campaign;
		this.activeLevel = 0;
		this.activeMapSprites = [];
		this.activePlayer = 0;
		this.turn = 0;
	};

	ActiveGameData.prototype.loadMapSprites = function(){
		var len = this.campaign.levels[this.activeLevel].mapData.spriteIndex.length;
		console.log(len);
		for(var x = 0; x < len; x++){
			try{
				this.activeMapSprites[x] = LoadImage(this.campaign.levels[this.activeLevel].mapData.spriteIndex[x]);
			} catch (e) { console.log(e); };
		}
	};

	QM.ActiveGameData = ActiveGameData;
	return QM;
})(QM || {});