# Class ideas


---

## Campaign
Class for managing the game between levels

PROPERTIES

#### name: string
Written name of this campaign

#### teams: array(objects)
List of teams in this campaign, index is team id
> ##### onlyAI: boolean
> True if this team can only be AI controlled
> ##### startHeroTypes: array(strings)
> A list of creature types that this team can take as starting heroes. The length of this list is the maximum Players that can be on this team (one creature per player)
> ##### visibilityMap: array(2D)
> Current game map showing area explored so far by this team

#### levels: array(objects)
List of levels (in order) for this campaign
> ##### id: string
> Identifier for this level (path to level data?)
> ##### complete: boolean
> True if this level has been successfully completed

#### graphics: string(JSON)
JSON object containing all graphical information for this campaign



---

## Level
Class for managing a single game level including its map

PROPERTIES

#### id: string
Identifier for this level (matches Campaign reference)

#### name: string
Written name of this level

#### introText: string
Text for level introduction story.

#### winCondition: object(?)
Condition specification for wining this level

#### map: array(2D)
2D map of this level containing level state



---

## Floor
Class for managing a single game level including its map

PROPERTIES

#### tile: object(Pt)
The x,y location of this floor piece

#### graphics: string(JSON)
JSON object containing all graphical information for this tile floor



---

## Wall
Class defining a single side of a Tile

PROPERTIES

#### tile: object(Pt)
The x,y location of this wall

#### side: string("right|bottom")
The side of the tile where this wall is located

#### hidden: boolean
True if this wall is initially hidden and only found on 'Search for traps'

#### walkThrough: boolean
True if creatures can walk through this wall

#### seeThrough: boolean
True if creatures can see through this wall

#### shootThrough: boolean
True if creatures can shoot (missile weapons, projectile spells) through this wall

#### onActivate: object(event)
Event that takes place if a creature activates this wall (eg. opens a door)

#### onPass: object(event)
Event that takes place if a creature passes this wall (eg. teleporter?)

#### onFind: object(event)
Event that takes place if a 'Search for traps' action reveals this wall (eg. secret door)

#### graphics: string(JSON)
JSON object containing all graphical information for this wall



---

## Trigger
Class defining a trigger such as a trap or map exit

PROPERTIES

#### tile: object(Pt)
The x,y location of this trigger

#### name: string
Written name of this trigger

#### keywords: array(strings) [lowercase letters only]
List of descriptors for identification purposes, eg. ["trap","mechanical","pit"]

#### team: integer
The team this trigger is part of (eg. only fall into opponent's traps)

#### hidden: boolean
True if this trigger is initially hidden and only found on 'Search for traps'

#### onEnter: object(event)
Event that takes place if a creature walks on this trigger (eg. get into pit)

#### onPass: object(event)
Event that takes place if a creature passes though this trigger (eg. jump pit)

#### onFind: object(event)
Event that takes place if a 'Search for traps' action reveals this trigger (eg. spear trap removed on find)

#### graphics: string(JSON)
JSON object containing all graphical information for this trigger



---

## Furniture
Class defining furniture such as a chest, table or sack of loot

PROPERTIES

#### tileGroup: array(Pts)
The x,y locations of this furniture set (eg. 6 squares of a table)

#### name: string
Written name of this furniture item

#### keywords: array(strings) [lowercase letters only]
List of descriptors for identification purposes, eg. ["table","wooden"]

#### walkThrough: boolean
True if creatures can walk through this

#### seeThrough: boolean
True if creatures can see through this

#### shootThrough: boolean
True if creatures can shoot (missile weapons, projectile spells) through this

#### inventory: array(strings)
List of Equipment contained within this

#### graphics: string(JSON)
JSON object containing all graphical information for this trigger



---

## Creature
Class defining a creature

PROPERTIES

#### tile: object(Pt)
The x,y location of this

#### name: string
Written name of this

#### keywords: array(strings) [lowercase letters only]
List of descriptors for identification purposes, eg. ["orc","greenskin","monster"]

#### team: integer
The team this is part of

#### body: object( current:integer, total:integer )
How much health this creature has

#### mind: object( current:integer, total:integer )
How much mental fortitude this creature has

#### move: object( current:integer, total:string )
How many tiles this creature can move per turn. Total is stored in a string in the format "*X*d+*Y*" where X is the number of dice and Y is added to that.

#### defence: object( current:integer, total:integer, chance:integer)
The current (used in combat), total (to revert to after temporary adjustments such as potions) and chance (in d6, eg. 5 for heroes, 6 for, monsters)

#### attack: object( current:integer, total:integer, chance:integer)
The current (used in combat), total (to revert to after temporary adjustments such as potions) and chance (in d6, eg. 5 for heroes, 6 for, monsters)

#### actions: object( current:integer, total:integer)
The number of actions (eg. attacks, searches) permitted by this creature per turn

#### carryCapacity: integer
Maximum number of Equipment (stacks) carried by this creature

#### inventory: array(strings)
List of Equipment held

#### conditions: array(strings)
List of Conditions currently applied to this creature

#### magic: object
All details of this creature's magical abilities
> ##### schools: array(strings)
> Magic schools available to this creature (eg. "fire","earth","air","water")
> ##### versatility: integer
> Number of spell schools available to choose from (eg. Elf=1, Wizard=3)
> ##### spellsPerSchool: integer
> Number of spells available per school (eg. Elf=3, Wizard=3)
> ##### spells: array(strings)
> List of spells currently available for this creature to cast

#### graphics: string(JSON)
JSON object containing all graphical information for this trigger


---

## Equipment
An item held by a creature (eg. sword, potion, coin)


---

## Condition
A creature condition or ability (eg. Dwarven ability to remove traps, potion effects, spell effects, trap effects etc..)


---

## Spell
A magical ability available to certain creatures
