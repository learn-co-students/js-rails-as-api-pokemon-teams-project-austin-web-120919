const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//DOM elements
const mainContainter = document.querySelector('main');

document.addEventListener('DOMContentLoaded',() => {
    getTrainers();
})

function getTrainers(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        for (const trainer of resp){
            createTrainerCards(trainer);
        };

    })
    .catch(error => {
        console.log(error.message);
    });
};



function getPokemons(){
    fetch(POKEMONS_URL)
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp);
            return resp;
        })
        .catch(error => {
            console.log(error.message);
        });

};


function updateDataForPokemon(id,trainer_id){
    
    let pokemonConfigationObject = {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            id: id,
            trainer_id: trainer_id
        })
    }; 

    fetch(POKEMONS_URL + `/${id}`,pokemonConfigationObject)
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp);
        })
        .catch(error => {
            console.log(error.message)
        });
};
    

function createTrainerCards(trainer){
    let newTrainerCard = document.createElement('div');
    newTrainerCard.className = 'card';
    
    let newTrainerPTag = document.createElement('p');
    
    let addPokemonToTrainerButton = document.createElement('button');
    addPokemonToTrainerButton.innerText = 'Add Pokemon';
    
    newTrainerCard.setAttribute('data-trainer-id',`${trainer.id}`);
    newTrainerPTag.innerText = trainer.name;
    newTrainerCard.appendChild(newTrainerPTag);
    addPokemonToTrainerButton.setAttribute('data-trainer-id',`${trainer.id}`);
    newTrainerCard.appendChild(addPokemonToTrainerButton);
    mainContainter.appendChild(newTrainerCard);
    let newPokemonList = document.createElement('ul');
    newTrainerCard.appendChild(newPokemonList);
    for (let pokemon of trainer.pokemons){
        console.log('test');
        newPokemonList.appendChild(buildPokemonListItem(pokemon));
    }
    
};

function buildPokemonListItem(pokemon){
    let newPokemonListItem = document.createElement('li');
    let newPokemonButton = document.createElement('button');
    newPokemonButton.className = 'release';
    newPokemonButton.innerText = 'Release';
    newPokemonListItem.innerText = pokemon.nickname;
    newPokemonButton.setAttribute('data-pokemon-id',`${pokemon.id}`)
    newPokemonListItem.appendChild(newPokemonButton);
    return newPokemonListItem
};



