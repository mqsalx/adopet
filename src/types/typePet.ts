import EnumSpecies from "../enum/EnumSpecies.js"

type TypePet = {
    id: number,
    name: string,
    species: EnumSpecies,
    adopt: boolean,
    age: number
}

export default TypePet