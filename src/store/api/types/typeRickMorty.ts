type Episode = {
    url:string;
}

type Origin = {
    name:string;
    url: string;
}

type Location = {
    name:string;
    url: string;
}

type Results = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: Episode[];
    url: string;
    created: string;
};

  
export type RickMorty = {
  count: number;
  pages:number;
  next: string;
  prev: string;
  results: Results[];
};