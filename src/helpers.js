export const terrain = Object.freeze({
    regTerrain: "0",
    defTerrain: "defTerrain",
    flyTerrain: "flyTerrain",
    wall: "wall",
    trench: "trench",
    forest: "forest",
    breakable: "breakable",
    damageable: "damageable",
})

export const unit = Object.freeze({
    create: "create",
    place: "place",
})

const assets = []
assets[terrain.regTerrain] = require('./assets/terrain.svg')
assets[terrain.defTerrain] = require('./assets/defensive.svg')
assets[terrain.forest] = require('./assets/forest.svg')
assets[terrain.trench] =  require('./assets/trench.svg')
assets[terrain.breakable] = require('./assets/wall-broken.svg')
assets[terrain.damageable] = require('./assets/wall.svg')
assets[terrain.flyTerrain] = require('./assets/mountain.svg')
assets[terrain.wall] = require('./assets/stop.svg')

export function createBackground() {
    const images = []
    for (let arg of arguments) {
        images.push(`url(${assets[arg]})`)
    }
    return {
        backgroundImage: images
    }
}
