import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';
    
    async function downloadPokemons() {
        try {
            const response = await axios.get(POKEDEX_URL); // This downloads list of 20 Pokémon
            const pokemonResult = response.data.results; // We get the array of Pokémon from the result
            
            // Iterating over the array of Pokémon and using their URL to create an array of promises
            const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));

            // Passing that promise array to Promise.all
            const pokemonData = await axios.all(pokemonResultPromise); // Array of 20 Pokémon detailed data

            // Now iterate on the data of each Pokémon and extract their name, types, ID, and image.
            const pokeListResult = pokemonData.map((pokeData) => {
                const pokemon = pokeData.data;

                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_shiny,
                    types: pokemon.types
                };
            });

            setPokemonList(pokeListResult);
        } catch (error) {
            console.error("Error downloading Pokémon:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        downloadPokemons();
    }, []);

    return (
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
            <div className="pokemon-wrapper">
            {isLoading ? 'Loading...' : 
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
            }
            </div>
            <div className="controls">
                <button>prev</button>
                <button>next</button>
            </div>
        </div>
    );
}

export default PokemonList;
