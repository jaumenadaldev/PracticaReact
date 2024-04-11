import styled from '@emotion/styled';
import 'bootstrap/dist/css/bootstrap.min.css';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import useQueryReplicator from './hooks/useQueryReplicator';

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
        color: props.color || 'black',
    })
);


interface RickMortyData {
    name: string,
    image: string
}

export default function RickMortyAll() {

    const { data, isLoading } = useQueryReplicator();

    return (
        <>     
            {!isLoading ? (
                <h4>Loading...</h4>
            ) : data ? (
                <>
                <H1 color="green">All Rick And Morty</H1>
                    <CardContainer>
                        {data.map((rickMorty: RickMortyData, index: number) => (
                            <Card key={index}>
                                    <p className="card-text">{rickMorty.name}</p>
                                    <LazyLoadImage 
                                        src={rickMorty.image}
                                        alt="Rick and Morty"
                                        height={"200px"}
                                        width={"200px"}
                                    />                           
                            </Card>
                        ))}
                    </CardContainer>
                </>
            ) : null}                        
        </>
    )
}