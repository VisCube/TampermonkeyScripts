// ==UserScript==
// @name         nonogramsonline.com
// @namespace    https://github.com/VisCube/TampermonkeyScripts
// @version      2025-03-21
// @description  Stylistic changes for the puzzle page
// @author       VisCube
// @match        https://nonogramsonline.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nonogramsonline.com
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle(`
        div {
            min-width: max-content;
        }
        td.left-numbers {
            white-space: nowrap;
        }
        td.puzzle-cell {
            height: 50px;
            min-width: 50px;
        }
    `);

})();