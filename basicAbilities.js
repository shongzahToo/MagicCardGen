class Stat {
    constructor(manaCost, abilities) {
        this.manaCost = manaCost;
        this.abilities = abilities;
    }
}

// Weighted Abilities Dictionary
var abilityWeights = [
    { ability: new Stat(1, "Flying"), weight: 4 },
    { ability: new Stat(0, "Trample"), weight: 4 },
    { ability: new Stat(1, "Haste"), weight: 4 },
    { ability: new Stat(1, "First-strike"), weight: 3 },
    { ability: new Stat(2, "Double-strike"), weight: 2 },
    { ability: new Stat(1, "Deathtouch"), weight: 2 },
    { ability: new Stat(2, "Flash"), weight: 1 },
    { ability: new Stat(2, "Hexproof"), weight: 2 },
    { ability: new Stat(1, "Lifelink"), weight: 3 },
    { ability: new Stat(-1, "Defender"), weight: 2 },
    { ability: new Stat(2, "Indestructible"), weight: 1 },
    { ability: new Stat(1, "Menace"), weight: 2 },
    { ability: new Stat(1, "Prowess"), weight: 1 },
    { ability: new Stat(1, "Reach"), weight: 3 },
    { ability: new Stat(1, "Vigilance"), weight: 3 },
    { ability: new Stat(1, "Horsemanship"), weight: 1 },
    { ability: new Stat(2, "Unblockable"), weight: 1 },
    { ability: new Stat(2, "Infect"), weight: 1 },
    { ability: () => xAbility("Annihilator", 1, 5, 2), weight: 1 },
    { ability: new Stat(4, "Convoke"), weight: 1 },
    { ability: new Stat(1, "Cascade"), weight: 1 },
    { ability: new Stat(2, "Shroud"), weight: 1 },
    { ability: new Stat(5, "Storm"), weight: 1 },
    { ability: generateColorProtection, weight: 1 }
];

// Function to randomly pick from weighted probabilities
function getRandomAbility(excludedAbilities = new Set()) {
    let totalWeight = abilityWeights.reduce((sum, { weight }) => sum + weight, 0);
    let rand = Math.random() * totalWeight;
    let cumulative = 0;

    for (let { ability, weight } of abilityWeights) {
        cumulative += weight;
        if (rand < cumulative && !excludedAbilities.has(ability.abilities)) {
            return typeof ability === "function" ? ability() : ability;
        }
    }
}

function genBasicAbilities() {
    let numOfAbilities = Math.max(Math.floor(Math.sqrt(Math.random()) * 4) + 1, 1);
    let selectedAbilities = new Set();
    let finalAbilities = [];

    while (finalAbilities.length < numOfAbilities) {
        let ability = getRandomAbility(selectedAbilities);
        if (ability) {
            selectedAbilities.add(ability.abilities);
            finalAbilities.push(ability);
        }
    }

    let totalCost = finalAbilities.reduce((sum, el) => sum + el.manaCost, 0);
    let abilityNames = finalAbilities.map(el => el.abilities).join(", ");
    return new Stat(Math.ceil(totalCost / 2 + 1), abilityNames);
}

// X-Ability Function
function xAbility(ability, min, max, scaler) {
    let rand = Math.floor(Math.random() * (max - min + 1) + min);
    return new Stat(rand * scaler, `${ability} ${rand}`);
}

// Generate Color Protection
function generateColorProtection() {
    let colors = ["red", "blue", "green", "white", "black"];
    let rand = Math.floor(Math.random() * 5) + 1;

    if (rand === 5) return new Stat(3, "Protection from all colors");

    let shuffled = colors.slice().sort(() => Math.random() - 0.5);
    let finalColors = shuffled.slice(0, rand).join(", ");
    return new Stat(Math.ceil(rand / 2), `Protection from: [${finalColors}]`);
}

export { genBasicAbilities };