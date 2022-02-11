let hero = {
  name: 'Jake',
  img: '😉',
  health: 100,
  attackPower: 10,
  energy: 10,
  gold: 100
}

let baddies = [
  {
    name: 'Jim',
    img: '🧙‍♂️',
    health: 100,
    attack: 5,
    gold: 15
  },
  {
    name: 'Bob',
    img: '🧙',
    health: 100,
    attack: 2,
    gold: 80
  },
  {
    name: 'Doug',
    img: '🙀',
    health: 150,
    attack: 2,
    gold: 1
  }
]

let companions = {
  mick: {
    name: 'Mick',
    cost: 1000,
    attackPower: 5600,
    purchased: false
  },
  chuck: {
    name: "Chuck",
    cost: 5,
    attackPower: 25,
    purchased: false
  },
  larry: {
    name: "Larry",
    cost: 1,
    attackPower: 2,
    purchased: false
  }
}



let baddie = null

// Invoke when
//  - [ ] each time I restart game
//  - [x] onEnemyDefeat
//  - [x] onPageLoad
// Picks ar random index from the baddies to get a single baddie and assigns it to the current baddie
function chooseBaddie() {
  let randomI = Math.floor(Math.random() * baddies.length)
  baddie = baddies[randomI]
}

// conditions that will not allow an attack
function attackBaddie() {
  //  - [x] hero cant attack when ded
  if (hero.health <= 0) { return } // return means full stop
  // dont allow attack if baddie is ded
  if (baddie.health <= 0) { return }
  // dont allow attack if not enough energy
  if (hero.energy <= 0) { return }

  baddie.health -= hero.attackPower

  // total the value of all purchased compaions attackPower
  // apply totalVale decrease to baddie health

  let totalCompanionAttackPower = 0
  // how do we iterate over a dictionary 
  for (let key in companions) {
    let companion = companions[key]
    if (companion.purchased) {
      totalCompanionAttackPower += companion.attackPower
    }
  }

  baddie.health -= totalCompanionAttackPower


  hero.energy--
  if (baddie.health <= 0) {
    onBaddieKilled()
  }
  update()
}

// what are all teh things wwe do when the baddie is killed
function onBaddieKilled() {
  baddie.health = 0 // always clamp lower and high values
  hero.gold += baddie.gold
  baddie.gold = 0
  chooseBaddie()
}

// which one?
function purchaseCompanion(companionName) {
  // find the companion by the companionName
  let companion = companions[companionName]

  // stop if....
  // - [ ] no companion by that name
  // - [ ] not enough gold
  // - [ ] hero is dead
  // - [ ] compaion already purchased

  if (!companion) { return console.log('noped')}
  if (hero.gold < companion.cost) { return console.log('not enought gold') }
  if (hero.health <= 0) { return console.log('uhh you ded') }
  if (companion.purchased) { return console.log('already did that')}

  // what do we do when purchase is valid
  // - [ ] mark compaion as purchased
  // - [ ] remove hero gold

  companion.purchased = true
  hero.gold -= companion.cost

  update()
}


function update() {
  console.log(hero, baddies, baddie, companions)
}


chooseBaddie()