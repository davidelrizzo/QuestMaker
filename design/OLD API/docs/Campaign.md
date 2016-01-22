# Campaign



## Attributes

### maxPlayers:Int
> maximum number of players including AIs

### teamOptions:Array
> An array of objects containing `maxHeroes`, the number of heroes available to that team and `availableHeroes`, the hero types available to that team. If a hero type appears more than once then it is available that many times.
> 

```
  // Example
  [{ maxHeroes: 4 },{ availableHeroes: ["barbarian", "elf", "wizard", dwarf"] }],
  [{ maxHeroes: 0 },{ availableHeroes: [] }]
```

### data:Obj
> blueprint data for creation of all game objects. eg. campaign.data.creatures.orc contain key/value pairs to create new orc.

### maps:Array
> list of all campaign maps (levels) in order



## Methods

### init(path)
- **path:String** - URL to campaign JSON data

> creates Campaign instance and populates with data from `path`

### maxTeams():Int
- **Returns:Int** - max number of teams in this campaign

> returns teamOptions.length

### maxPlayers():Int
- **Returns:Int** - max number of players in this campaign

> returns sum of max(teamOptions[x].maxHeroes, 1)
