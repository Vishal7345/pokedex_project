import { Routes ,Route} from "react-router-dom";
import Pokedex from "../Componentes/Pokedex/Pokedex";
import PokemonDetails from "../Componentes/PokemonDetails/PokemonDetails";
function CustomRoutes(){
 return(
<Routes>
<Route path='/' element={<Pokedex/>}/>
<Route path='/pokemon/:id' element={<PokemonDetails/>}/>
</Routes>

 );

}
export default CustomRoutes;