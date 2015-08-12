"use strict"

var QM = (function(QM){

	function HeroQuest(){
		QM.Campaign.call(this);
	};

	/*
	class HeroQuest extends QM.Campaign{
		constructor()
		{
			super(
				"Hero Quest",
				"The fire burns warmly, but casts little light into Mentor's study.\n The flickering shadows only hint at the vast number of books and scrolls that fill the many shelves.  Slowly Mentor walks over to the fire. Well, my friends, your training is complete. You are not yet true Heroes, you have yet to prove yourself. But first, let me tell you of Zargon... Many centuries ago, Zargon was my apprentice.  He worked hard and learned quickly. But impatience devoured him. He wanted to learn more powerful magic. I told him of the dangers, and that he should be patient, for in time he would become a great Sorcerer. But Zargon could not wait; each night he broke into my study and read my spell books. The secrets that were held within them were great indeed. Once he learned these secrets, Zargon fled. When I caught up with him, I found him greatly changed. He had pledged his allegiance to the Great Powers of Chaos. Fool! He saw magic only as a short-cut to power and paid no heed to the terrible price he would have to pay. I tried to reason with him, but to no avail. He laughed in my face and then unleashed a terrible spell which I was hard-pressed to counter. For many days we battled, but Zargon had allies stronger even than I, and I could not defeat him. In the end, as we both weakened, he fled and sought refuge in the Northern Chaos Wastes. There he licked his wounds and honed his skills, conjuring ancient powers with which to overthrow the Empire.\n",
				undefined
			);
		};
	};

	QM.HeroQuest = new HeroQuest();
	*/

	return QM;
})(QM || {});