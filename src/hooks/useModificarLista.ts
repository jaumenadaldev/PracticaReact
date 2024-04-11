import { useMemo } from "react";

interface ObjetoLista {
    id: number;
    nombre: string;
    tipo: string;
}

function useModificarLista(listaInicial: ObjetoLista[], modificar:boolean): ObjetoLista[] {
    return useMemo(() => {
        if (modificar) {
            console.log("Modificando lista");
            return listaInicial.map(objeto => {
                if (objeto.tipo === 'Masculino') {
                    console.log(`Modificando: ${objeto.nombre}`);
                    return { ...objeto, nombre: `Modificado${objeto.id}`};
                }
                return objeto;
            });
        }
        return listaInicial
    }, [listaInicial, modificar]);
}

export default useModificarLista;