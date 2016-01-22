# Creature



## Attributes

### id:Int
> unique id for this creature

### name:String
> full descriptive name

### type:String
> alpha lowercase unique type (eg. dwarf or chaoswarrior)

### subtypes:Array
> list of alpha lowercase unique keywords to categories this creature (eg. undead)

### player:Player
> controlling player, a creature may only ever be controlled by one player at a time.

### location:Pt
> map co-ord of creature location, if null creature is not on map


/*
    ATTRIBUTE IDEAS
    ---
    BOOLEAN FLAGS
    isHero - creature exists outside map and must exit or die to end level
    isActive - creature has turns
    canSearchTreasure - creature can search for treasure
    canSearchTraps - creature can search for traps
    canTriggerWalls - creature can open doors etc..
    canQuip - creature can use and/or equip items
    canTrade - creature can trade, sell and buy equipment
    ---
    OTHER
    graphics:JSON - all graphic related data stored as JSON object
    sound:JSON - all sound related data stored as JSON object
*/



## Methods

### init(type, player, location)
- **type:String** = this.type
- **player:Player** = this.player
- **location:Pt** = this.location

> Creates a Creature instance and initializes with data from game.campaign.data.creatures[type]