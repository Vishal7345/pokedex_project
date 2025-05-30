
import { useParams } from "react-router-dom";
import './PokemonDetails.css'
import usePokemonDetails from "../../hooks/usePokemonDetails";
function PokemonDetails(){
    const{id}=useParams();
    const[pokemon]=usePokemonDetails(id)
  

return(

<div className="pokemon-details-wrapper">
   <img className="pokemon-details-image"src={pokemon.image}/>
    <div className="pokemon-details-name"> <span>{pokemon.name}</span> </div>
    <div className="pokemon-details-name">Height : {pokemon.height}</div>
    <div className="pokemon-details-name">Weight:{pokemon.weight}</div>
    <div className="pokemon-details-types">
     {pokemon.types && pokemon.types.map((t)=><div key={t}>{t}</div>)}
    </div>
    
    {
       pokemon.types && pokemon.similarPokemons &&
        <div>

            more {pokemon.types[0]} types pokemons
            <ul>
            {pokemon.similarPokemons.map((p)=><li key={p.pokemon.id}>{p.pokemon.name}</li>)}
            </ul>
            
        </div>
    }
</div>

)

}
export default PokemonDetails;