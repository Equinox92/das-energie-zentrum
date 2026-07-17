// [6.2.1]
// Imports centralized runtime state.
import {
    energyState
}
from "./energyState.js";

// =====================================================
// ENGINEERING SCORING ENGINE
// =====================================================

// [6.2.2]
// Calculates total engineering score safely.
export function calculateTotalScore() {

    // [6.2.3]
    // Initializes scalable score accumulator.
    let totalScore = 0;

    // =====================================================
    // ITERATES THROUGH ENGINEERING ZONES
    // =====================================================

    // [6.2.4]
    // Iterates through all engineering zones safely.
    Object.values(
        energyState
    ).forEach(zone => {

        // [6.2.5]
        // Prevents invalid zone processing.
        if (
            !zone ||
            !zone.installedSystems
        ) {

            return;
        }

        // =====================================================
        // ITERATES THROUGH INSTALLED SYSTEMS
        // =====================================================

        // [6.2.6]
        // Processes installed engineering systems.
        zone.installedSystems.forEach(
            system => {

                // [6.2.7]
                // Synchronizes engineering score safely.
                totalScore +=
                    system.score || 0;
            }
        );
    });

    // =====================================================
    // SCORE NORMALIZATION
    // =====================================================

    // [6.2.8]
    // Prevents negative engineering scores.
    totalScore =
        Math.max(
            totalScore,
            0
        );

    // [6.2.9]
    // Prevents engineering overflow.
    totalScore =
        Math.min(
            totalScore,
            100
        );

    // [6.2.10]
    // Returns finalized engineering score.
    return totalScore;
}