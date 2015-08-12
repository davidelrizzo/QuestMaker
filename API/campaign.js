/*jslint browser: true, white: true*/
"use strict";


var api = window.api || {};

// Class: Campaign
// ======================================
// **Campaign(campaignJSON)** - class for campaign instance, takes campaign blueprint data {@arg: JSON}
api.Campaign = function (campaignJSON) {


  // Check Campaign argument is a valid JSON string <br>
  try { JSON.parse(campaignJSON);} catch (e) { throw new Error("new api.Campaign(a) must take a JSON string of campaign data as the argument."); }

  // **Campaign.DATA()** = Get blueprint data for this campaign {@return: JSON string}
  this.DATA = function () { return campaignJSON; };




  // teams - [Team]
  // levels - [Level]
  // currentLevel - arrayIndex
  // graphics - JSON
  // sound - JSON


  // Init
  // --------------------------------------
  // **TODO:** Create campaign from initial DATA


};

