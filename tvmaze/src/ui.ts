import $ from 'jquery';
import { getEpisodesOfShow, searchShowsByTerm } from "./model.ts";
import { IShow, IEpisode } from './interfaces.ts';

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const $episodesList = $("#episodesList");

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows: IShow[]): void {
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

/** When button is clicked, calls API for list of episodes and displays
 * them in the episode area
 */

async function getAndShowEpisodes(evt: JQuery.ClickEvent): Promise<void> {
  const $clickedButton = $(evt.target);
  const showId: number = $clickedButton.closest(".Show").data("show-id") as number;
  const episodes: IEpisode[] = await getEpisodesOfShow(showId);

  populateEpisodes(episodes);
}

// const $showEpisodeButton = $(".Show-getEpisodes");
$showsList.on("click", ".Show-getEpisodes", getAndShowEpisodes);