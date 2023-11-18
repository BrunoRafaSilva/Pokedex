const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;


function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHTML = pokemons
      .map(
        (pokemon) =>
          `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
            <ol class="types">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}"> ${type}</li>`)
                  .join("")}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
      )
      .join("");
    pokemonList.innerHTML += newHTML;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens(offset, limit);
  }
});

// Deixar comentado para aprendizado
// pokeApi.getPokemons().then((pokemons) => {
//   const newList = pokemons.map((pokemon) => {
//     return convertPokemonToHtml(pokemon);

//     //return pokemon.name
//   });

//   const newHtml = newList.join("");

//   console.log(newList);
//   console.log(newHtml);

//   pokemonList.innerHTML += newHtml;

//   /*
//   Pode se reduzir a esse trecho de código
//   pokeapi.getPokemons().then((pokemons =[]) =>{
//     pokemonsList.innerHTML += pokemons.map(convertPokemonToHtml).join(1)
//   })
//    */

//   //Iremos gravar todo o retorno dentro de uma lista para adicionar tudo de uma fez e não ficar adicionando um a um.
//   //   const lisItems = [];

//   //   for (num in pokemons) {
//   //     const pokemon = pokemons[num];
//   //     console.log(pokemon);
//   //     lisItems.push(convertPokemonToHtml(pokemon));
//   //   }

//   //   console.log(lisItems);
// });
