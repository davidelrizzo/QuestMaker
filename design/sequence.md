# Game Sequence

```
Select campaign
Start new campaign
    Add player (human or AI)
        Select controlled creatures (max/type set by campaign)(sets turn order)
    Start campaign loop
        Select level, view level intro
        Start level
            Select creature spells
            Add map creatures to a player (eg. monsters to AI)
            Start game round
                Start creature turn
                    Show map (based on creature/team)
                    Set path (only if valid, may include end action)
                        Step (end on trigger?)
                            Activate trigger
                            Update map visibility
                        Search for treasure
                            Reveal treasure
                            Manage inventory
                        OR Search for traps (Path to self?)
                            Reveal traps
                        OR Attack
                            Calculate hits/damage
                            Deal damage (has a creature died?)
                                Kill creature (all creatures on non AI team dead?)
                                    Campaign failure screen
                        OR Interact with wall
                            Activate wall (eg. open door)
                        OR Use (Equipment/Spell/Condition)
                            Select equipment and target
                            OR Select spell and target
                            OR Select condition and target
                        OR Drop equipment (if on furniture adds to contents)
                            Select equipment and quantity
                            Drop
                        OR Trade
                            Select equipment, quantity and target
                            Trade (if valid)
                    End path
                End turn (has level victory been met?)
            End round
        End level (is this the last level?)
        Shop 
            Purchase equipment
            OR Sell equipment
            OR Trade equipment
    End campaign loop
    Campaign victory screen
End campaign
```


