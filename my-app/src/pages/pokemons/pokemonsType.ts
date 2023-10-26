export interface Pokemons {
    name: string,
    url: string,
}

export interface OnePokemon{
    id: number,
    name: string,
    abilities: Ability[],
    types: Type[],
    sprites: Sprites,
    weight: number
}

interface Ability {    
    ability: {
        name: string
    }
}

interface Type {
    type: {
        name: string
    }
}
interface Sprites {
    other: Other
}

interface Other {
    home: Home,
}

interface Home {
    front_default: string
}