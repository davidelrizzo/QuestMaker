/*jslint browser: true, white: true*/
"use strict";


var api = window.api || {};

// Class: Campaign
// ======================================
// **Campaign(campaignJSON)** - class for campaign instance, takes campaign blueprint data {@arg: JSON}
api.Campaign = function (campaignJSON) {


  if ( JSON.parse(campaignJSON) ) {
    this.DATA = campaignJSON;
    // **TODO:** Create campaign from initial DATA
  } else {
    // Campaign is not created
  }

  // **Campaign.DATA()** = Get blueprint data for this campaign {@return: JSON string}
  this.DATA = function () { return campaignJSON; };


  // teams - [Team]
  // levels - [Level]
  // currentLevel - arrayIndex
  // graphics - JSON
  // sound - JSON



};

