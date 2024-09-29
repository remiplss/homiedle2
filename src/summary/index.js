import React from "react";
import './summary.css'

/**
 * @typedef {Object} UserTry
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
 * @property {UserTry[]} tries - List of every tries the user made
 */

/**
 * Render the Summary component
 * @param {SummaryProps} props
 * @constructor
 */
export function Summary(props) {
  const { win, tries  } = props;

  if (!win) return null;

  console.log(tries);

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
