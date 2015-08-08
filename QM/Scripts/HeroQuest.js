"use strict"

var QM = (function(QM){
	class HeroQuest extends QM.Campaign{
		constructor()
		{
			super(
				"Hero Quest",
				"The fire burns warmly, but casts little light into Mentor's study.\n The flickering shadows only hint at the vast number of books and scrolls that fill the many shelves.  Slowly Mentor walks over to the fire. Well, my friends, your training is complete. You are not yet true Heroes, you have yet to prove yourself. But first, let me tell you of Zargon... Many centuries ago, Zargon was my apprentice.  He worked hard and learned quickly. But impatience devoured him. He wanted to learn more powerful magic. I told him of the dangers, and that he should be patient, for in time he would become a great Sorcerer. But Zargon could not wait; each night he broke into my study and read my spell books. The secrets that were held withinthem were great indeed. Once he learned these secrets, Zargon fled. ",
				undefined
			);
		};
	};

	QM.HeroQuest = new HeroQuest();
	return QM;
})(QM || {});