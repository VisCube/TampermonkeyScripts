// ==UserScript==
// @name         stepik.org
// @namespace    https://github.com/VisCube/TampermonkeyScripts
// @version      2025-04-03
// @description  Modifies activity statistics on the profile page
// @author       VisCube
// @match        https://stepik.org/users/*/profile
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stepik.org
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.3/waitForKeyElements.js
// ==/UserScript==

/* User input */

const CURRENT_STREAK = null;
const LONGEST_STREAK = null;
const PROBLEMS_SOLVED = null;
const ACTIVITY = [
    /* [WEEK_OF_YEAR (1-53), DAY_OF_WEEK (1-7), ACTIVITY_LEVEL (1-5)] */
    // [1, 1, 2], // Week 1, Monday, 1-4 problems
    // [1, 2, 3], // Week 1, Tuesday, 5-9 problems
    // [1, 3, 4], // Week 1, Wednesday, 10-24 problems
    // [1, 4, 5], // Week 1, Thursday, 25+ problems
    // [1, 5, 4], // Week 1, Friday, 10-24 problems
    // [1, 6, 3], // Week 1, Saturday, 5-9 problems
    // [1, 7, 2], // Week 1, Sunday, 1-4 problems
];

/* End of user input */

(function () {
    'use strict';

    waitForKeyElements(".last-activity-stats", (element) => {
        let activityStats = element.querySelectorAll(".last-activity-stats__value");
        if (CURRENT_STREAK != null) activityStats[0].innerHTML = CURRENT_STREAK.toString();
        if (LONGEST_STREAK != null) activityStats[1].innerHTML = LONGEST_STREAK.toString();
        if (PROBLEMS_SOLVED != null) activityStats[2].innerHTML = PROBLEMS_SOLVED.toString();
    });

    waitForKeyElements(".graph", (element) => {
        ACTIVITY.forEach(function ([week, day, q]) {
            let weekFormatted = week < 10 ? `0${week}` : week;
            let oldRect = element.querySelector(`.w_${weekFormatted} g:nth-child(${day}) rect`);

            let newRect = oldRect.cloneNode(true);
            for (let i = 1; i <= 5; i++) {
                newRect.classList.remove(`q${i}`)
            }
            newRect.classList.add(`q${q}`);

            oldRect.after(newRect);
            oldRect.remove();
        });
    });
})();