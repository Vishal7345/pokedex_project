import './Pokemon.css'
function  Pokemon( {name,image}){

return(
<div className='pokemon'>
    <div className='pokemon-name'>{name}</div>
    <div className='pokemon-image'><img src={image}/>
    </div>
     

 </div>
)


}
export default Pokemon;