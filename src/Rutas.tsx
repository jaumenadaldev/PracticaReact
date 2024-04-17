import { Route, Routes } from 'react-router-dom'
import ComponenteLista from './listaModificada'
import RickMortyAll from './RickMortyAll'
import RickMorty from './RickMorty'
import RickMortyAxios from './RickMortyAxios'
import Hotels from './Hotels'
import FormulariFormik from './FormulariFormik'
import HotelsFormik from './HotelsFormik'
import HotelsReactForm from './HotelsReactForm'

export default function Rutas () {
  return (
    <Routes>
        <Route path="/" element={ <RickMorty/> }/>
        <Route path="/listamodificada" element={ <ComponenteLista/> }/>
        <Route path="/allRickMorty" element={ <RickMortyAll/> }/>
        <Route path="/axiosRickMorty" element={ <RickMortyAxios/> }/>
        <Route path="/hotels" element={ <Hotels/> }/>
        <Route path='/formulariFormik' element={ <FormulariFormik/> }/>
        <Route path='/hotelsFormik' element={ <HotelsFormik/> }/>
        <Route path='/hotelsReactHookForm' element={ <HotelsReactForm/> }/>
    </Routes>
  )
}
