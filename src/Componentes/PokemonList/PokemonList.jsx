import { useEffect, useState } from "react";
import axios from 'axios'
import './PokemonList.css'
import Pokemon from "../../Pokemon/Pokemon";

function PokemonList(){

    const[pokemonList,setPokemonList]=useState([]);

    const[isloading,setIsLoading]=useState(true);
    const POKEDEX_URL='https://pokeapi.co/api/v2/pokemon';

 async function downloadpokemons(){

 const response= await axios.get(POKEDEX_URL) //THIS DOWNLOADS LIST OF 20 POKEMONS

 const pokemoResults=response.data.results;//WE GET THE ARRAY POKEMONS FROM RESULTS

console.log(response.data)
//ITERATING OVER THE ARRAY OF POKEMONS,AD USING THEIR URL , TO CREATE THE ARRAY OF PROMISES
//THAT WILL DOWNLOADS THOSE 20 POKEMONS
const pokemonResultPromise= pokemoResults.map((pokemon)=>axios.get(pokemon.url));
//PASSING THAT PROMISE ARRAY TO AXIOS.ALL
const pokemonData=await axios.all(pokemonResultPromise)//ARRRAY OF 20 POKEMONS DETAILED DATA 

console.log(pokemonData)
//NOW ITERATE ON THE DATA OF EACH POKEMON,AND EXTRACT ID , NAME, IMAGE,TYPES
const pokeListResult=(pokemonData.map((pokeData)=>{

const pokemon=pokeData.data
return{
    id:pokemon.id,
    name:pokemon.name,
    image:(pokemon.sprites.other) ?pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
    types:pokemon.types

}

}))
console.log(pokeListResult)
setPokemonList(pokeListResult)
 setIsLoading(false)

 }   

   
    
    useEffect(()=>{
   downloadpokemons()
      
    },[])


return(

<div className="pokemon-list-wrapper">  
<div className="pokemon-wrapper">
{(isloading)? 'isloading':

pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id}/>)

}
</div>
<div className="controls">
    <button>Prev</button>
    <button>Next</button>

</div>
</div>

)

}
export default PokemonList;