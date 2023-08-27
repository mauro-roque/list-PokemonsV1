import {Pokemon} from "./pokemon-model.js";
export {pokeApi};

function convertPokeApiDetailToPokemon(pokeDetail){
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types
  pokemon.types = types
  pokemon.type = type
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
  return pokemon
}

const pokeApi = {
  getPokemons: (offset = 0,limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}/`
    return fetch(url)
    .then((respostaBody) => respostaBody.json())
    .then((respConvertidaJson) => respConvertidaJson.results)
    .then((pokemons) => pokemons.map((pokeApi.getPokemonDetail)))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
  },
  getPokemonDetail: (pokemon) => {
    return fetch(pokemon.url)
      .then((resposta) => resposta.json())
      .then(convertPokeApiDetailToPokemon)
  }
}

//não consigo retornar diretamente o obj exemplo:
//.then((respConvertidaJson) => {
//  return respConvertidaJson.results
//})
//pois eu tenho q retornar o fetch() inteiro pois a ideia dele ja e retornar algo dando certo ou errado



