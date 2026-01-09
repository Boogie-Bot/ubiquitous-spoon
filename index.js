(function() {
"use strict";
window.addEventListener('load', init);

function init() { 
    //Event with search button       
    const searchButton = id('searchBtn');
    searchButton.addEventListener('click', getPokemon);
}
    
    function getPokemon(response) {
        //First end point of my api
        const url = `https://pokeapi.co/api/v2/pokemon/`;
        const pokemonNumber = id('number');

        //Second endpoint of my api includes original with whatever number is typed into the input attached to the end
        const finalUrl = url + pokemonNumber.value;
        console.log(finalUrl);
        //Fetching the url from the api
        fetch(finalUrl)
            .then(statusCheck)
            .then((response) => response.json())
            .then(generateCard)
            .catch(handleError);
    }

    function generateCard(response){
        console.log(response);

        const img = document.querySelector('.pokeImage img'); // Select the existing image
        img.src = response.sprites.other.dream_world.front_default;//Changing of image to the selected pokemons image

        const hp = id('hp');
        hp.textContent = response.stats[0].base_stat + " hp";//Finding the hp of the selected pokemon

        const pokeName = id('name');
        pokeName.textContent = response.name.toUpperCase();//Finding the name of the selected pokemon

        const attack = id('attack');
        attack.textContent = "Attack: " + response.stats[1].base_stat;//Finding the attack power of the selected pokemon

        const defense = id('defense');
        defense.textContent = "Defense: " + response.stats[2].base_stat;//Finding the defense power of the selected pokemon

        const speed = id('speed');
        speed.textContent = "Speed: " + response.stats[5].base_stat;//Finding the speed of the selected pokemon
    }

    function handleError(error) {
        console.log(error);
    }
/////////////////////////////////////////////////////////////////////
    // Helper functions
    /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} res - response to check for success/error

    * @return {object} - valid response if response was successful, otherwise rejected
    *                    Promise result
    */
    async function statusCheck(res) {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
    }

    function id(id) {
        return document.getElementById(id);
    }

    function qs(selector) {
        return document.querySelector(selector);
    }

    function qsa(selector) {
        return document.querySelectorAll(selector);
    }
})();