import axios from "axios";
import { useEffect, useState } from "react";


function usePokemonList(){

    const[pokemonListState,setPokemonListState]=useState({
         
        pokemonList:[],
        isloading  :true,
        pokedexUrl :'https://pokeapi.co/api/v2/pokemon',

        nextUrl    :'',

        prevUrl    :''
        

    })
    async function downloadpokemons(){
        
     
      
     
     

     
            setPokemonListState({...pokemonListState, isloading:true});
            const response= await axios.get(pokemonListState.pokedexUrl) //THIS DOWNLOADS LIST OF 20 POKEMONS
        
            const pokemoResults=response.data.results;//WE GET THE ARRAY POKEMONS FROM RESULTS
        
        console.log("response ise",response.data.pokemon)
        console.log(pokemonListState)
            setPokemonListState((state)=>({
            ...state,
            nextUrl:response.data.next,
            prevUrl:response.data.previous
        
        }))
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
     setPokemonListState((state)=>({
         ...state,
         pokemonList: pokeListResult,
         isloading:false
     }))
    
     }
     useEffect(()=>{
        downloadpokemons()

     },[pokemonListState.pokedexUrl])
     return[pokemonListState,setPokemonListState]
}

export default usePokemonList;