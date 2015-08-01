# QuestMaker
API and Interface for basic roguelike game and editor


## Aims
-  A playable roguelike game with mechanics similar to HeroQuest
-  An editor that allows you to create any game possible from the ruleset


## Platform
- The game and editor will run on Chrome desktop
- All game data will be saved in JSON format
- The API will deal with all data getting, setting and modification. The API will be fully documented
- The Interface will deal with all interaction, visuals and sound (graphic and sound data can be passed through the API but will never be manipulated by it)
- There will be a separate Interface for the game and the editor
- There will be one sprite sheet per game object type (eg. creatures, furniture, floors etc..) therefore data will only need to store offset (x,y)*gridSize


## Design philosophy
- Plan (document) everything, iteratively code minimum possible
- Game objects will be as abstract as possible to allow maximum editor variability
- Everything is universal
    - There is no difference between a hero and monster other than attribute values (eg. Can creature leave the map? Can it reveal fog of war?, It it contoled by AI or player? Can it carry Equipment? etc..)
    - Named special monsters are just different monster types that you only see once in a campaign
- Maps can be any (2D) shape, no concept of Rooms
- Each map Tile has ONLY one creature, trigger, furniture, right and bottom wall
- Line of sight based on squares not rooms (so you might be able to see parcial furniture) (Is line of sight per player, per team or per creature?eg. fog of war)
- Triggers (eg. traps, level exits) belong to a specific team(s) and can only be activated by that team
- Each Level defines entry, exit points and victory conditions
- All human player actions can be done with a ‘click’
- Each team is _against_ all other teams
- 

## House Rules
Rule variants that differ from HeroQuest
- Creatures can only search for treasure on furniture (not rooms)
- Searching for traps is on all visible tiles up to 12 away
- Creatures have an equipment carry capacity (eg. 9 slots for heroes 0 for monsters). Some items can stack (eg. 100 coins per slot, 6 potions etc..)
- Equipping items TBC: auto equip or by an action
- Adjacent creatures on the same team can trade equipment


## Basic classes
- **Campaign** <br> Player & Team info. Level list. Activities between levels
- **Level** <br> Map (2D array), Victory conditions. 
- **Team** <br> Identifier for creatures on the same side and shared assets
- **Floor** <br> Tile graphics
- **Wall** <br> Can be right or bottom of tile only. Even on activate
- **Trigger** <br> Map entry/exit. Trap. Map revealer. Event on enter/leave
- **Furniture** <br> One or more tiles grouped. Can contain Treasure
- **Creature** <br> Universal hero or monster
- **Equipment** <br> Held by creature or in Furniture. May be stacked. Event on activate
- **Spell** <br> Held by creature. Event on activate
- **Condition** <br> A creature state or ability. Effect while applied and/or on manual activate
- **Treasure** <br> An event that can occur when searching furniture (either pre-set or random), can contain equipment or trigger events (eg. wandering monster, trap)


## Game rule concepts
- The ruleset should be similar to HeroQuest but far more flexible
- No concept of rooms
- Can only search for treasure on a furniture Equipment (eg. chest, bookcase) not rooms
- Search traps in visible area or limit of squares?
- Equipment (stack) limit per creature (Say 8 for a hero, 0 for most monsters), some - equipment can be stacked though, eg. coins up to 100 or potions
- All Equipment owned is immediately used. (eg. you cannot hold two equipment of same type, say two 'Left hand' equipment)
- Maps can be any shape or size (2D grid)
- Each Tile can have one creature, one trigger, one item of furniture and a right and bottom wall.
- Line of sight based on squares not rooms (this has implications for multi square objects like furniture)
- Is line of sight per player, per team or per creature?
- There is no difference between a hero and monster other than attribute values (eg. Can this creature leave the map? Can it reveal fog of war?, Can it carry Equipment? etc..)
- Named special monsters are just different monster types that you only see once in a campaign
- Campaign defines max players, number of teams and level sequence
- Triggers (eg. traps, level exits) belong to a specific team(s) and can only be activated by that team
- Each level (map) defines entry and exit points
- Each level defines its own victory conditions
- OPTION: There is no shop interface, just a shop level between each dungeon and you move the heroes to each shop/merchant to buy/sell.


## Interface ideas
- Creature action will be dictated by click target. First click to set(highlight) path, second click perform. Possible click targets are:
    - Empty tile: Move to that tile
    - Creature(Enemy): Move to closest adjacent square and attack (or ranged attack if possible)
    - Creature(Friend): Move to closest adjacent square and trade
    - Furniture: Move to closest adjacent square and search for treasure
    - Wall(Usable): Move to closest adjacent square and activate (eg. open)
    - Trigger(Usable): Move to closest adjacent square and activate (eg. jump in pit, exit map)
    - Self: Search for traps
- Avoid hover to cater for touch devices






