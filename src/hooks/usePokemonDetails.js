import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id) {
    const [pokemon, setPokemon] = useState({});
    const [pokemonListState, setPokemonListState] = usePokemonList();

    async function downloadpokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        // Await the response for pokemon of the same type
        const pokemonOfSameTypeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ' '}`);

        // Log the pokemonOfSameType data
        console.log('s', pokemonOfSameTypeResponse);

        // Update the pokemon state with fetched data
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
            similarPokemons: pokemonOfSameTypeResponse.data.pokemon,
        });

        // Update pokemonListState
        setPokemonListState({
            ...pokemonListState,
            type: response.data.types ? response.data.types[0].type.name : ' ',
        });
    }

    useEffect(() => {
        downloadpokemon();
    }, [id]); // Refetch data when the `id` changes

    useEffect(() => {
        console.log('pokemonListState', pokemonListState);
    }, [pokemonListState]);

    return [pokemon];
}

export default usePokemonDetails;
