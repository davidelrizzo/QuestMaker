# Game Sequence

## Assumptions
- Single player (one player, one AI)

## Sequence
Select campaign
Start new campaign
    Select controlled creatures (max/type set by campaign)(sets turn order)
        Select creature spells
    Start campaign loop
        Select level, view level intro
        Start level
            Add map creatures to a player
            Start game round (track this?)
                Start creature turn
                    Show map (based on creature/team)
                    Set path (only if valid, may include end action)
                        Step (end on trigger?)
                            Activate trigger
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
                        OR Use (Item/Spell/Condition)
                            Select item and target
                            OR Select spell and target
                            OR Select condition and target
                        OR Drop item (if on furniture adds to contents)
                            Select item and quantity
                            Drop
                        OR Trade
                            Select item, quantity and target
                            Trade (if valid)
                    End path
                End turn (has level victory been met?)
            End round
        End level (is this the last level?)
        Shop 
            Purchase item
            OR Sell item
            OR Trade item
    End campaign loop
    Campaign victory screen
End campaign



