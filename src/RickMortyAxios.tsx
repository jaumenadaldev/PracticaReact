import Buttons from './Buttons';
import styled from '@emotion/styled';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import type { RickMorty } from './store/api/types/typeRickMorty';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axiosInstance from './store/api/axiosService';
import ButtonsAxios from './ButtonsAxios';

interface CardContainerProps{

}

const CardContainer = styled.div<CardContainerProps>(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '20px',
    marginBottom: '20px',
    gap: '10px',
    padding: '10px',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%',
}));

interface CardProps{

}

const Card = styled.div<CardProps>(() => ({
    margin: '10px',
    textAlign: 'center',
    width: '18rem',
    border:'3px solid black',
    borderRadius: '10px',
    padding: '15px',
}));

interface ParentProps{
    
}
const Parent = styled.div<ParentProps>(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))


interface H1Props{
    color?: string;
}
const H1 = styled.h1<H1Props>(
    {
        textAlign: 'center',
        margin: '20px',
        fontSize:'32px',
    },
    props => ({
        color: props.color,
    })
);
export default function RickMortyAxios() {

const [data, setData] = useState<RickMorty | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');
const [page, setPage] = useState(1);

useEffect(() => {
    const fetchCharacters = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get<RickMorty>('character/?page=${page}');
            setData(response.data);
            setError('');        
        } catch (error: any) {
            setError('An error occurred while fetching characters');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchCharacters();
}, [page]);

return (
    <>     
        {error ? (
            <h4>Oh no, there was an error</h4>
        ) : isLoading ? (
            <h4>Loading...</h4>
        ) : data ? (
            <>
            <H1 color='green'>Rick And Morty</H1>
                <CardContainer>
                    {data.results.map((character: any) => (
                        <Card key={character.id}>
                            <div className="card-body">
                                <p className="card-text">{character.name}</p>
                                <LazyLoadImage 
                                    src={character.image}
                                    alt="Rick and Morty"
                                    height={"200px"}
                                    width={"200px"}
                                />
                            </div>                            
                        </Card>
                    ))}
                </CardContainer>
            </>
        ) : null}                        
    <Parent>
        <ButtonsAxios
            onPageChange={setPage}
            currentPage={page}
        />
    </Parent>
    </>
    )
}