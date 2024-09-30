import React from "react";
import './summary.css'

const emojis = {
  fail: "🟥",
  correct: "🟩"
}

/**
 * @typedef {Object} User
 * @property {string[]} Activite
 * @property {string[]} Age
 * @property {string[]} Anciennete
 * @property {string[]} Badge
 * @property {string[]} Couleur
 * @property {string[]} Elo
 * @property {string[]} Role
 * @property {string[]} pseudo
 */

/**
 * @typedef {Object} SummaryProps
 * @property {boolean} win - Indicates if the user has won
 * @property {User[]} tries - List of every tries the user made
 * @property {User} finalAnswer - The final answer
 */

/**
 * Returns the appropriate emoji based on the comparison of test and answer.
 *
 * @param {string} test - The test string to compare.
 * @param {string} answer - The answer string to compare.
 * @returns {string} - The emoji representing the result of the comparison.
 */
function getEmojiForAnswer(test, answer) {
  return test === answer ? emojis.correct : emojis.fail;
}

/**
 * Returns the appropriate emoji based on the comparison for the complete trials.
 *
 * @param {User[]} trials - The test string to compare.
 * @param {User} finalAnswer - The answer string to compare.
 * @returns {string[]} - The emoji representing the result of the comparison.
 */
function getEmojiForCompleteTrials(trials, finalAnswer) {
  console.log(trials, finalAnswer);

  return trials.map((trial) => {
    return Object.entries(trial).map(([key, value]) => {
      return { key, value, emoji: emojis.correct };
    });
  });
}

/**
 * Render the Summary component
 * @param {SummaryProps} props
 * @constructor
 */
export function Summary(props) {
  const { win, tries, finalAnswer  } = props;

  if (!win) return null;

  console.log(tries, finalAnswer);
  const emojis = getEmojiForCompleteTrials(tries, finalAnswer);
  console.log(emojis);

  async function handleCopySummary() {
    await navigator.clipboard.writeText("Hello, World!");
  }

  return (
    <button
      className='summary'
      onClick={handleCopySummary}
    >
      Copier le rapport
    </button>
  )
}
