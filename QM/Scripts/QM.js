//=====================================================================================
// File: QM.js
// Desc: This file contains the initial definition of the Hero Quest application
//       namespace.  All aspects of the Hero Quest application should exists within
//       this namespace, whether they relate to user interface of the game engine
//       itself.
//=====================================================================================
"use strict"

var QM = (function(QM){

  //----------------------------------------------------------------------------------
  // Method: start
  // Desc: This method initializes and runs the Hero Quest application.
  //----------------------------------------------------------------------------------
  QM.start = function()
  {
    Debug("Start");

    try{
      QM.Canvas2D.initialize("cDisplay");
      QM.QMState.initialize();
    } catch (err) { console.log(err); }

  	Debug(QM);
    
    try{
      QM.mainLoop();  
    } catch(err){ console.log(err); };
    
  };

  QM.mainLoop = function()
  {
    
    /*
    try{
      var img = new Image();
      img.src = "./Images/Background.gif";
      QM.Canvas2D.drawImage(img, {x : 0, y : 0}, 0, {x : 0, y : 0}, 1);
      //QM.Canvas2D.context.drawImage(img, 0, 0);
    }
    catch(err)
    {
      console.log(err);
    }
    
    */
    try
    {
      QM.QMState._currentState.update();
      QM.QMState._currentState.render();
    } catch (err) { console.log(err); };


    requestAnimationFrame(QM.mainLoop);
  }

  return QM;
})(QM || {});
