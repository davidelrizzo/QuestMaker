/**
 * File: Campaign.js
 * Desc: This file contains the core ampaign class.
 * To Do:
 *	-> Should sound and graphics be included in the class element which pertains to the API?
 *  -> Shoud the core API handle reading of JSON data?  The campaign class might be best
 *     be populated directly.
 */

"use strict"

var QM = (function (QM){
	
	/**
	 * Class: Campaign
	 * Desc: Base class for a campaign.
	 */

	function Campaign(json){
		/**
		 * Load the campaign data from a json file.
		 */

		/*
		try{
			var data = JSON.parse(json);
		} catch (e) { console.log(e); };
		*/

		/*
		this.campaignName = data.name;		// Name of the campaign.
		this.introText = data.introText;	// Campaign introductory text.
		this.levels = undefined;			// List of levels.
		this.teams = undefined;				// List of teams.
		this.creatures = undefined;			// Creature templates?
		this.furniture = undefined;			// List of furniture
		this.triggers = undefined;			// List of triggers
		this.equipment = undefined;			// List of available equipment (for store)
		this.conditions = undefined;		// List of conditions
		this.spells = undefined;			// List of spells?

		this.graphics = undefined;			// List of graphic resources
		this.sound = undefined;				// List of sound resources
		*/
	};

	QM.Campaign = Campaign;
	return QM;
})(QM || {});