// [6.2.1]
// Imports centralized runtime state.
import { energyState }
from "./energyState.js";

// [6.2.2]
// Calculates total engineering score.
export function calculateTotalScore() {

    // [6.2.3]
    // Initializes scalable score accumulator.
    let totalScore = 0;

    // [6.2.4]
    // Iterates through installed systems safely.
    Object.values(
        energyState
    ).forEach(system => {

        // [6.2.5]
        // Prevents invalid score processing.
        if (
            !system ||
            !system.installed
        ) {

            return;
        }

        // [6.2.6]
        // Synchronizes engineering scoring.
        totalScore +=
            system.score || 0;
    });

    // [6.2.7]
    // Prevents score overflow.
    return Math.min(
        totalScore,
        100
    );
}