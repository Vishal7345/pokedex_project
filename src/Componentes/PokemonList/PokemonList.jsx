import './PokemonList.css'
import Pokemon from "../../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";
function PokemonList(){

 const[pokemonListState,setPokemonListState]=usePokemonList(false);


return(

<div className="pokemon-list-wrapper">  
<div className="pokemon-wrapper">
{(pokemonListState.isloading)? 'isloading':

pokemonListState.pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)

}
</div>
<div className="controls">
    <button disabled={pokemonListState.prevUrl==null} onClick={()=>{
         const urlToSet=pokemonListState.prevUrl;
        setPokemonListState({...pokemonListState,pokedexUrl:urlToSet})}
        }>Prev</button>
    <button disabled={pokemonListState.nextUrl==null}onClick={()=>{
          console.log(pokemonListState)
                 const urlToSet=pokemonListState.nextUrl;
        setPokemonListState({...pokemonListState,pokedexUrl:urlToSet })}
        }>Next</button>

</div>
</div>

)

}
export default PokemonList;