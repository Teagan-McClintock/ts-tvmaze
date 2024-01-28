//{id, name, summary, image}
interface IShow {
  id: number,
  name: string,
  summary: string,
  image: string
}

//{id, name, summary, image}
interface IShowResult {show: {
  id: number,
  name: string,
  summary: string,
  image: {medium?: string}
}}

//{ id, name, season, number }
interface IEpisode {
  id: number,
  name: string,
  season: number,
  number: number
}

export type {IShow, IShowResult, IEpisode};