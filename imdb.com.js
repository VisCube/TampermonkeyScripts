// ==UserScript==
// @name         imdb.com
// @namespace    https://github.com/VisCube/TampermonkeyScripts
// @version      2025-03-22
// @description  Adds VidSrc links to title pages
// @author       VisCube
// @match        https://www.imdb.com/title/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=imdb.com
// @grant        GM_addElement
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';
    let streamingURL = getStreamingURL();
    if (streamingURL != null) addStreamingLink(streamingURL);
})();

function parseTitleID(titleURL) {
    let regexMatch = titleURL.match("(tt\\d+)");
    return regexMatch ? regexMatch[1] : null;
}

function parseSeasonEpisode(seasonEpisode) {
    let regexMatch = seasonEpisode.match("S(\\d+)\\.E(\\d+)");
    return regexMatch ? [regexMatch[1], regexMatch[2]] : null;
}

/* There are no identifiers for this particular element, so... */
function getTitleType() {
    return document
        .querySelector("[data-testid='hero__pageTitle']")
        .parentElement
        .lastChild
        .firstChild
        .textContent;
}

function getEpisodeURL() {
    // Episodes have separate ids, so we have to find the show first
    let seriesURL = document
        .querySelector("[data-testid='hero-title-block__series-link']")
        .href;
    let episodeNumber = document
        .querySelector("[data-testid='hero-subnav-bar-season-episode-numbers-section']")
        .textContent;

    let titleID = parseTitleID(seriesURL);
    let seasonEpisode = parseSeasonEpisode(episodeNumber);

    if (!titleID || !seasonEpisode) return null;
    return `https://vidsrc.xyz/embed/tv?imdb=${titleID}&season=${seasonEpisode[0]}&episode=${seasonEpisode[1]}`;
}

function getStreamingURL() {
    let titleID = parseTitleID(location.pathname);
    if (!titleID) return null;

    let titleType = getTitleType();
    if (!isNaN(Number(titleType))) {
        // There is no type, so this title is a movie
        return `https://vidsrc.xyz/embed/movie?imdb=${titleID}`;
    } else if (titleType.startsWith("TV")) {
        // Title type is "TV Series"
        return `https://vidsrc.xyz/embed/tv?imdb=${titleID}`;
    } else if (titleType.startsWith("Episode")) {
        // Title type is "Episode aired ..." or "Episode airs ..."
        return getEpisodeURL();
    } else return null;
}

function addStreamingLink(streamingURL) {
    if (!streamingURL) return;

    let watchlistContainer = document.querySelector(".ipc-split-button");
    let streamingContainer = watchlistContainer.cloneNode(true);

    streamingContainer.innerHTML = "";
    streamingContainer.classList.add("vidsrc-link-container");
    watchlistContainer.parentElement.after(streamingContainer);

    GM_addElement(streamingContainer, "a", {"class": "vidsrc-link", "href": streamingURL});
    GM_addStyle(`
        .vidsrc-link-container {
            border-color: rgb(26, 124, 188);
            border-style: solid;
            border-width: medium;
            margin-top: 1rem;
        }
        .vidsrc-link {
            background-color: rgb(27, 29, 34);
            background-image: url('https://vidsrc.xyz/template/vidsrc-logo-light.svg');
            background-position: center;
            background-size: 100% 2rem;
            width: 100%;
        }
    `);
}