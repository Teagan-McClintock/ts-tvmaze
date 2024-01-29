const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";

import { IEpisode, IShow, IShowResult } from "./interfaces";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function searchShowsByTerm(term: string): Promise<IShow[]> {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const response: Response = await fetch(
    `${TVMAZE_API_URL}search/shows?q=${term}`);

  const result: IShowResult[] = await response.json();

  const searchResults = result.map(searchResult => (
    {
      id: searchResult.show.id,
      name: searchResult.show.name,
      summary: searchResult.show.summary,
      image: searchResult.show.image.medium || MISSING_IMAGE_URL
    }
  ));
  return searchResults;
}


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id: number): Promise<IEpisode[]> {
  const response = await fetch(`${TVMAZE_API_URL}shows/${id}/episodes`);

  if (response.status !== 200) throw new Error(String(response.status));

  const result: IEpisode[] = await response.json();

  return result.map(r => ({
    id: r.id,
    name: r.name,
    season: r.season,
    number: r.number
  }));
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
