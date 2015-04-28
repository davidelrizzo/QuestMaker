# QuestMaker
API for basic roguelike game mechanics

## Concept
- API only deals with the ruleset, it is graphic, sound and interface agnostic
- The ruleset should be very similar yo HeroQuest but far more flexible
- There is no reason why a ‘fan made’ HeroQuest campaign could not be made from this (or many other board games)
- No concept of rooms
- Can only search for treasure on a furniture item (eg. chest, bookcase) not rooms
- Search traps in visible area, limit of squares?
- Item (stack) limit per creature (Say 9 for heros, 0 for most monsters), some - items can be stacked though, eg. coins up to 100 or potions
- All items owned are equipped. (Cannot hold two items of same type, eg. Left hand)
- Maps can be any shape or size (2d grid)
- Each Tile can have one creature, one trigger, one item of furniture and a right and bottom wall.
- Line of sight based on squares not rooms (this has implications for multi square objects like furniture)
- There is no difference between a hero and monster other than attribute values (eg. can this creature leave the map, does it start under fog of war, can it carry equipment, etc..)
- Named special monsters are just different monster types that you only see once in a campaign
- Campaign defines max players, number of teams and level sequence
- Triggers belong to a specific team(s) and can only be activated by that team
- Each level (map) defines entry and exit points
- Each level defines its own victory conditions

## API calls (brainstorm)

##### qm.map.getPath(map,pt1,pt2,team):array
Returns shortest A* path between pt1 and pt2 for given team. Returns null if no path found.

##### qm.map.inLineOfSight(map,pt1,pt2,team):boolean
Returns true if straight line between pt1 and pt2 are not visibly blocked for the given team.

##### qm.map.visibleArea(map,pt,team):array
Returns all visible squares from given point for given team.

##### qm.actions.attack(attNum,attChance,defNum,defChance):object
Returns array of hits(boolean), array of blocks(boolean) and result(int) hits- blocks.

##### qm.actions.chance(chance):boolean
Returns true if a random number between 1 and 6 is greater or equal to given chance.


