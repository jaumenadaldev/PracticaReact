import React, { useState } from "react";
import useModificarLista from "./hooks/useModificarLista";

const ComponenteLista: React.FC = () => {
    const listaInicial = [
        { id: 1, nombre: 'Raul', tipo:'Masculino'},
        { id: 2, nombre: 'Andres', tipo:'Masculino'},
        { id: 3, nombre: 'Juan', tipo:'Masculino'},
        { id: 4, nombre: 'Maria', tipo:'Femenino'},
        { id: 5, nombre: 'Carolina', tipo:'Femenino'},
        { id: 6, nombre: 'Sandra', tipo:'Femenino'},
    ];
    
    const [modificar, setModificar] = useState(false);
    const listaModificada = useModificarLista(listaInicial, modificar);
    return (
        <>
        <h1>Lista de Objetos {modificar ? 'Modificada' : 'Inicial'}</h1>
        <ul>
            {listaModificada.map(objeto => (
                <li key={objeto.id}>{`${objeto.nombre} (${objeto.tipo})`}</li>
            ))}
        </ul>
        {!modificar && (
        <button onClick={() => setModificar(true)}>Modificar Nombres</button>
        )}
        </>
    );
};

export default ComponenteLista;