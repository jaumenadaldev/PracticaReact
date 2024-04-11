import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RickMorty } from './types/typeRickMorty'

export const RickMortyAllApi = createApi({
    reducerPath: 'rickMortyAllApi',

    baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),

    endpoints: (builder) => ({
        getAllRickMorty: builder.query<RickMorty, void>({
            query: () => 'character',
            transformResponse: (response : RickMorty) => {
                let newList = { ...response}
                newList.results = response.results.concat (response.results)
                
                newList = { ...response, results: newList.results.map((rickMorty) => ({ ...rickMorty, image: rickMorty.image +"?random="+ Math.random() })) }
                return newList;
           }
        }),
        
    }),
});


export const { useGetAllRickMortyQuery } = RickMortyAllApi;