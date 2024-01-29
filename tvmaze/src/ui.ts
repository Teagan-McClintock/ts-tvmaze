import $ from 'jquery';
import { getEpisodesOfShow, searchShowsByTerm } from "./model.ts";
import { IShow, IEpisode } from './interfaces.ts';

const $showsList = $("#showsList");
const $episodesList = $("#episodesList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows: IShow[]): void {
  console.log("populateShows", shows);

  $showsList.empty();

  for (const show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${show.image}
              alt=${show.name}
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($show);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay(): Promise<void> {
  console.log("searchForShowAndDisplay");

  const term: string = $("#searchForm-term").val() as string;
  const shows: IShow[] = await searchShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt: JQuery.SubmitEvent) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given an array of episode info, generates markup and appends to the episode
 * list, then shows the previously-hidden episodes area
 */

function populateEpisodes(episodes: IEpisode[]): void {
  console.log('populateEpisodes', episodes);

  $episodesList.empty();

  for (const episode of episodes) {
    const $episode = (
      `<li>
        ${episode.name} (season ${episode.season}, number ${episode.number})
      </li>`
    );

    $episodesList.append($episode);
  }

  $episodesArea.show();
}

/** Handle clicking on get episodes button and fetches a list of episodes from
 * the API.
 *
 * Generates a showId from the closest matching DOM element for CSS class Show
 *
 * Calls populateEpisodes with response from API call
 */

async function getAndShowEpisodes(evt: JQuery.ClickEvent): Promise<void> {
  console.log("getAndShowEpisodes", evt);

  const showId: number = $(evt.target).closest(".Show").data("show-id") as number;
  const episodes: IEpisode[] = await getEpisodesOfShow(showId);

  populateEpisodes(episodes);
}

$showsList.on("click", ".Show-getEpisodes", getAndShowEpisodes);