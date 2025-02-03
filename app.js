import { genBasicAbilities } from "./basicAbilities.js"
//import { genUniqueAbilities } from "./uniqueAbilities.js"

document.getElementById("generate").addEventListener("click", generate)


function generate() {
    GenerateCreature()
}

function GenerateCreature() {
    var typeline = document.getElementById("typeLine")
    var abilities = document.getElementById("abilities")
    var powerToughness = document.getElementById("powerToughness")
    var name = document.getElementById("name")
    var manaCost = document.getElementById("manaCost")

    var cost = 0;

    var ability = genAbilities()
    var powerToughnessStat = genPowerToughness()
    cost += powerToughnessStat.manaCost
    powerToughness.innerText = powerToughnessStat.abilities
    cost += ability.manaCost
    abilities.innerText = ability.abilities
    abilities.appendChild(powerToughness)
    manaCost.innerText = cost
}

function genPowerToughness() {
    let power = Math.max(Math.floor(Math.pow(1.005, Math.random() * 480)), 1);
    let toughness = Math.max(Math.floor(Math.pow(1.005, Math.random() * 480)) + 1, 1);
    return new stat(Math.floor((power + toughness)/3), power + "/" + toughness)
}

function genAbilities() {
    var cost = 0
    var basicAbilities = genBasicAbilities()
    var uniqueAbilities = genUniqueAbilities()
    cost += basicAbilities.manaCost + uniqueAbilities.manaCost


    var abilities = basicAbilities.abilities + "\n\n" + uniqueAbilities.abilities
    return new stat(cost, abilities)
}

function genUniqueAbilities() {
    return new stat(0, "testing")
}

class stat {
    constructor(manaCost, abilities){
        this.manaCost = manaCost
        this.abilities = abilities
    }
}