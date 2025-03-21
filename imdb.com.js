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
    addStreamingLink("#");
})();

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