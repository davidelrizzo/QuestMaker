# HeroQuest-API
The HeroQuest API is a minimal JS library which runs a virtual game of HeroQuest.

## Philosophy
* Allow invalid moves?
* The API is graphics independant?

## TO DO
- [ ] Document class attributes & methods, plus brief description of all arguments returns and intentions
- [ ] Example JSON data for each class (from real game examples)
- [ ] JSON Schema for each class type
- [ ] Code it up in JS
  - [ ] some kind of crude interface to play the game?

## Game sequence
```
    var game = new Game();
    game.campaign = new Campaign(URL);
    game.players.push( new Player("player1", 1) );
    game.players.push( new Player("player2", 1) );
    game.players.push( new Player("Morcar", 2) );
    game.creatures.push( new Creature("barbarian", game.players[0], null) );
    game.creatures.push( new Creature("wizard", game.players[1], null) );
    game.map = new Map(URL);
    .
    game.startLevel();
    game.startTurn( game.creatures[0] );

```
  
  
