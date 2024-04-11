import { Route, Routes } from 'react-router-dom'
import ComponenteLista from './listaModificada'
import RickMortyAll from './RickMortyAll'
import RickMorty from './RickMorty'
import RickMortyAxios from './RickMortyAxios'
import Hotels from './Hotels'

export default function  Rutas () {
  return (
    <Routes>
        <Route path="/" element={ <RickMorty/> }/>
        <Route path="/listamodificada" element={ <ComponenteLista/> }/>
        <Route path="/allRickMorty" element={ <RickMortyAll/> }/>
        <Route path="/axiosRickMorty" element={ <RickMortyAxios/> }/>
        <Route path="/hotels" element={ <Hotels/> }/>
    </Routes>
  )
}
