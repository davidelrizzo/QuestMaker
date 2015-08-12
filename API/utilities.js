/*jslint browser: true, white: true*/
"use strict";


var api = window.api || {};



// Class: Point
// ======================================
// **Pt(x,y)** - co-ordinate class {@args: integers}
api.Pt = function(x,y) {
  if ( Number(x)!==x || x%1!==0 || Number(y)!==y || y%1!==0 ) {
    throw new Error("api.Pt (x,y) arguments must be integers.");
  }
  this.x = x || 0;
  this.y = y || 0;
};

// **Pt.toString()** - prints the (x,y) values of this point {@return: String}
api.Pt.prototype.toString = function () {
  return "("+this.x+","+this.y+")";
};

// **Pt.equalTo(pt)** - returns true if this point is the same as given Pt {@arg: Pt}{@return: Boolean}
api.Pt.prototype.equalTo = function (pt) {
  if ( !(pt instanceof api.Pt) ) {
    throw new Error("api.Pt.equalTo argument must be an instance of the Pt class.");
  }
  if( this.x === pt.x && this.y === pt.y ) {
    return true;
  }
  return false;
};



// Static function: Dice
// ======================================
// **Dice()** - singleton object containing static functions for rolling dice
api.Dice = {

  // **Dice.chance(n)** - rolls d6 and returns true if >= n {@arg: integer between 1 and 6}
  chance: function(n) {

    if ( Number(n)!==n || n%1!==0 || n<1 || n>6 ) {
      throw new Error("api.Dice.chance argument must be an integer between 1 and 6");
    }

    return Math.floor((Math.random()*6)+1) >= n;
  }

};
