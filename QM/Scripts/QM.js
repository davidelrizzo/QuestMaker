"use strict"

var QM = (function(QM){

  QM.start = function(){
    Debug("Start");
    console.log(QM);

    // Create a new canvas for the application and add it to the DOM.
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "cDisplay");
    canvas.setAttribute("width", document.body.clientWidth);
    canvas.setAttribute("height", document.body.clientHeight);
    document.body.appendChild(canvas);

    QM.Canvas2D.initialize("cDisplay", QM.Mouse.onMousemove, QM.Mouse.onMousedown, undefined);

    this.initializeGameStates();

    QM.mainLoop();  
  };

  QM.mainLoop = function(){
  	//Debug("mainLoop");
    var state = QM.currentState.update();
    //console.log(state);
    if (state != "exit"){
      QM.currentState = QM[state];
      QM.currentState.render();
      requestAnimationFrame(QM.mainLoop);
    } else {
      // handle application exit.
    }
  };

  QM.initializeGameStates = function(){
    try{
    	this.mainMenuState = new this.MainMenuState();
    	this.campaignIntroState = new this.CampaignIntroState();
    	this.levelIntroState = new this.LevelIntroState();
   	 	this.gameState = new this.GameState(QM.Canvas2D.canvas, QM.Canvas2D.context);
   	 	this.currentState = this.mainMenuState;

	} catch (e) {console.log(e);}

    this.campaignIntroState.initialize(this.Canvas2D.canvas, this.Canvas2D.context);
    this.levelIntroState.initialize(this.Canvas2D.canvas, this.Canvas2D.context, this.Mouse);
  };

  return QM;
})(QM || {});
