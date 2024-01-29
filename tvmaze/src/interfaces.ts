//{id, name, summary, image}
interface IShow {
  id: number;
  name: string;
  summary: string;
  image: string;
}

//{ show: {id, name, summary, image} }
interface IShowResult {
  show: {
    id: number;
    name: string;
    summary: string;
    image: { medium: string; } | null;
  };
}

//{ id, name, season, number }
interface IEpisode {
  id: number,
  name: string,
  season: number,
  number: number;
}

export type { IShow, IShowResult, IEpisode };