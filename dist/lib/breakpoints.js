/**
 * Converts an object with an ordered list of breakpoints
 * into an object of named media queries.
 *
 * N.B. Numbers represents the maximum size for each breakpoint.
 *      You have to set the last breakpoint as infinity.
 *      You have to specify the breakpoints from the smaller to the bigger.
 *
 * e.g.  breakPoints({small:300, medium: 400,middle: 450, big: Infinity})
 *
 *   returns {
 *     big: "(min-width: 451px)",
 *     medium: "(min-width: 301px) and (max-width: 400px)",
 *     middle: "(min-width: 401px) and (max-width: 450px)",
 *     small: "(max-width: 300px)"
 *   }
 *
 * @param bp an object of named breakpoints
 *           e.g. {small: 300, medium: 400, big: Infinity}
 */
"use strict";

function breakPoints(bp) {
  var steps = Object.keys(bp).map(function (key) {
    return bp[key];
  }).slice(0, -1);

  var mediaqueries = toMqStrings(mqSteps(steps));

  return Object.keys(bp).reduce(function (prev, next, index) {
    prev[next] = mediaqueries[index];
    return prev;
  }, {});
}

// [1,2,3,4] -> [[1,2], [2,3], [3,4]]
function couples(arr) {
  return arr.length <= 2 ? [arr] : [[arr[0], arr[1]]].concat(couples(arr.slice(1)));
}

// [1,2,3,4] -> [[0,1], [1,2], [2,3], [3,4], [4,Infinity]]
function mqSteps(arr) {
  return couples([0].concat(arr).concat([Infinity]));
}

function toMqStrings(arr) {
  return arr.map(function (el) {
    return el[0] === 0 ? "(max-width: " + el[1] + "px)" : el[1] === Infinity ? "(min-width: " + (el[0] + 1) + "px)" : "(min-width: " + (el[0] + 1) + "px) and (max-width: " + el[1] + "px)";
  });
}

module.exports = breakPoints;