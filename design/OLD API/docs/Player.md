# Player



## Attributes

### id:Int
> unique identifier of this player

### name:String
> full descriptive name

### team:Int
> side this player belongs to, all creatures controlled by this player belong to this team. 
> Creatures cannot attack creatures on their team or be harmed by traps on their team. Creatures can walk past, see through and shoot through and trade with other creatures on their team.

### creatures:Array
> list of Creatures under this player's control



## Methods

### init(name, team)
- **name:String** = name
- **team:Int** = team

> creates Player instance, populates new unique id