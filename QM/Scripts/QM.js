//=====================================================================================
// File: QM.js
// Desc: This file contains the initial definition of the Hero Quest application
//       namespace.  All aspects of the Hero Quest application should exists within
//       this namespace, whether they relate to user interface of the game engine
//       itself.
//=====================================================================================
"use strict"

var QM = (function(QM){

  /**
   * Initialize the game application states and set the currently active state to
   * the mainMenuSate.
   */
  try{
    QM.mainMenuState = new QM.MainMenuState();
    QM.gameState = new QM.GameState();
    QM.campaignIntroState = new QM.CampaignIntroState();
    QM.currentState = QM.mainMenuState;
  } catch (err) { console.log(err); };

  /**
   * Method: start
   * Desc: This method initializes and runs the Hero Quest application.
   */
  QM.start = function()
  {
    Debug("Start");

    /**
     * Create a new canvas for the application and add it to the DOM.
     */
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "cDisplay");
    canvas.setAttribute("width", document.body.clientWidth);
    canvas.setAttribute("height", document.body.clientHeight);
    document.body.appendChild(canvas);

    QM.Canvas2D.initialize("cDisplay", QM.Mouse.onMousemove, QM.Mouse.onMousedown, undefined);
    QM.campaignIntroState.initialize(QM.Canvas2D.canvas, QM.Canvas2D.context);

  	Debug(QM);
    console.log(document.body.clientWidth);
    console.log(document.body.clientHeight);
    
    QM.mainLoop();  
    
  };

  QM.mainLoop = function()
  {
    Debug("mainLoop");
    try
    {
      var state = QM.currentState.update();
      if (state != "exit"){
        QM.currentState = QM[state];
        QM.currentState.render();

        requestAnimationFrame(QM.mainLoop);
      } else {
        // handle application exit.
      }
    } catch (err) { 
      console.log(err); 
    };
  }

  return QM;
})(QM || {});
