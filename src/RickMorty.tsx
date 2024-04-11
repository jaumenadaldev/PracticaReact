import { useSelector } from 'react-redux';
import { useGetRickMortyByPageQuery } from './store/api/RickMortyApi';
import { RootState } from './store/store';
import Buttons from './Buttons';
import styled from '@emotion/styled';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import type { RickMorty } from './store/api/types/typeRickMorty';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
export default function RickMorty() {

    const count = useSelector((state: RootState) => state.counter.value)

    const { data, error, isLoading } = useGetRickMortyByPageQuery(count)
    console.log("data",data);

    useEffect(() => {
        if (!isLoading && data?.results !== undefined) {
            setValue(data.results);
        }
    }, [data, isLoading]);

    const [value, setValue] = useState<RickMorty['results']>([])

    const sortedValue = [...value].sort((a, b) => a.id - b.id);

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
                        {sortedValue.map((rickMorty) => (
                            <Card key={rickMorty.id}>
                                <div className="card-body">
                                    <p className="card-text">{rickMorty.name}</p>
                                    <LazyLoadImage 
                                        src={rickMorty.image}
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
            <Buttons value={1}></Buttons>
        </Parent>
        </>
    )
}