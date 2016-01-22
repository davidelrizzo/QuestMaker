# Game



## Attributes

### campaign:Campaign
> current Campaign object

### players:[Player]
> list of players in this game

### creatures:[Creature]
> list of current creatures in this game *in turn order* (on map or between levels)

### currentCreature:Creature
> creature who's turn it currently is

### map:Map
> current map



## Methods

### init()
> starts new game

### startLevel()
> starts level triggering all start level actions

### startTurn(player)
- **player:Player** - player whose turn to start

> ends current turn and starts turn for given player