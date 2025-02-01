function generate() {
    var typeline = document.getElementById("typeLine")
    var abilities = document.getElementById("abilities")
    var powerToughness = document.getElementById("powerToughness")
    var name = document.getElementById("name")
    var manaCost = document.getElementById("manaCost")

    var Cost = 0;

    var ability = genAbilities()
    cost += ability.manaCost
    abilities.innerText = ability.abilities
    abilities.appendChild(powerToughness)
    manaCost.innerText = cost
}



function genAbilities() {
    cost = 0
    var basicAbilities = genBasicAbilities()
    var uniqueAbilities = genUniqueAbilities()
    cost += basicAbilities.manaCost + uniqueAbilities.manaCost

    var abilities = basicAbilities.abilities + "\n\n" + uniqueAbilities.abilities
    return new ability(cost, abilities)
}

function genBasicAbilities() {
    return new ability(10, "test")
}

function genUniqueAbilities() {
    return new ability(5, "testing")
}

class ability {
    constructor(manaCost, abilities){
        this.manaCost = manaCost
        this.abilities = abilities
    }
}