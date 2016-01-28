

/* Point class
    x,y co-ord point & point calculations
  ================================================ */
var Pt = function(x,y) {
  'use strict';

  /* Public variables
  ****************************/
  this.x = x || 0;
  this.y = y || 0;

  /* Public Methods
  ****************************/
  this.toString = function() {
    return "("+this.x+","+this.y+")";
  };

};


/* Add methods to Math object
  ================================================ */

// get random Int between (inclusive)
Math.randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
