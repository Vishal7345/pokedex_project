import { useEffect, useState } from "react";
import axios from 'axios'
import './PokemonList.css'
import Pokemon from "../../Pokemon/Pokemon";

function PokemonList(){

    const[pokemonList,setPokemonList]=useState([]);

    const[isloading,setIsLoading]=useState(true);
    
    const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon');
    const[nextUrl,setNextUrl]=useState('');
    const[prevUrl,setPrevUrl]=useState('')

 async function downloadpokemons(){
    setIsLoading(true);
 const response= await axios.get(pokedexUrl) //THIS DOWNLOADS LIST OF 20 POKEMONS

 const pokemoResults=response.data.results;//WE GET THE ARRAY POKEMONS FROM RESULTS

console.log(response.data)
setNextUrl(response.data.next);
setPrevUrl(response.data.previous)
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
      
    },[pokedexUrl])


return(

<div className="pokemon-list-wrapper">  
<div className="pokemon-wrapper">
{(isloading)? 'isloading':

pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)

}
</div>
<div className="controls">
    <button disabled={prevUrl==null} onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
    <button disabled={nextUrl==null}onClick={()=>setPokedexUrl(nextUrl)}>Next</button>

</div>
</div>

)

}
export default PokemonList;