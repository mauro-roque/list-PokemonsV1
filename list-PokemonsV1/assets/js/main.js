//offset qual pokemon eu estou page
//limit quantidade que eu posso carregar
import {pokeApi} from "./poke-api.js";
const pokemonListHTML = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;
const limit = 12;
let offset = 0;

function convertPokemonToHtml(pokemon){
  return `
  <li class="pokemon ${pokemon.type}">
    <span class="number">${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
      <ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
      </ol>
      <img src="${pokemon.photo}" alt=${pokemon.name}>
    </div>
  </li>
  `
}

function loadPokemonIterns(offset, limit){
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
  const listHtmlPokemons = []
  pokemons.forEach(element => {
    listHtmlPokemons.push(convertPokemonToHtml(element))
  });
  pokemonListHTML.innerHTML += listHtmlPokemons.join(" ")//join para tranformar o array em string e manipuilar o HTML
  })
}
loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtsRecordNextPage = offset + limit
  if(qtsRecordNextPage >= maxRecords){
    const newLimit = maxRecords - offset
    loadPokemonIterns(offset, newLimit)
    loadMoreButton.classList.add("sumirButtom");
    //ou para remover loadMoreButton.parentElemont.removeChild(loadMoreButton)
    return console.log('Limite de Pokemons Atingido')
  }else{
    loadPokemonIterns(offset, limit)
  }
})
//offset qual pokemon eu estou page / offset eo numero do pokemon que vou começar a me deslocar 
//limit quantidade de pokemon que eu posso carregar se for 5 vou carregar 5 pokemons apartir do pokemnon que estiver no offset
loadPokemonIterns(offset, limit)
//poderia fazer da forma direta mais isso faria com q o html recarregase varias vezes
//Exemplo: pokemonListHTML.innerHTML += convertPokemonToHtml(element)
//poderia usar tmb o metodo .map com o .join para tranformar em string



