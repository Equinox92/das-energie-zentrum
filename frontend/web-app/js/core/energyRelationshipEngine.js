// [4.3.1]
// Imports centralized runtime state.
import {
    energyState
}
from "./energyState.js";

// [5.8.6]
// Imports environmental simulation state.
import {
    environmentState
}
from "./environmentState.js";

// =====================================================
// ENGINEERING SCORE ENGINE
// =====================================================

// [5.2.2]
// Calculates intelligent building efficiency score.
export function calculateEnergyScore() {

    // [5.2.3]
    // Initializes scalable score accumulator.
    let score = 0;

    // =====================================================
    // ITERATES THROUGH ENGINEERING ZONES
    // =====================================================

    // [5.2.4]
    // Processes all engineering zones safely.
    Object.values(
        energyState
    ).forEach(zone => {

        // [5.2.5]
        // Prevents invalid engineering zones.
        if (
            !zone ||
            !zone.installedSystems
        ) {

            return;
        }

        // =====================================================
        // SYSTEM SCORING
        // =====================================================

        // [5.2.6]
        // Processes installed engineering systems.
        zone.installedSystems.forEach(
            system => {

                // [5.2.7]
                // Applies engineering system score.
                score +=
                    system.score || 0;
            }
        );
    });

    // =====================================================
    // ENVIRONMENTAL SIMULATION
    // =====================================================

    // [5.8.7]
    // Applies winter environmental penalties.
    if (
        environmentState.season ===
        "winter"
    ) {

        // [5.8.8]
        // Retrieves installed wall systems.
        const wallSystems =
            energyState.walls
                ?.installedSystems || [];

        // [5.8.9]
        // Retrieves installed window systems.
        const windowSystems =
            energyState.windows
                ?.installedSystems || [];

        // [5.8.10]
        // Penalizes missing wall insulation.
        if (
            wallSystems.length === 0
        ) {

            score -= 10;
        }

        // [5.8.11]
        // Penalizes missing window upgrades.
        if (
            windowSystems.length === 0
        ) {

            score -= 10;
        }
    }

    // =====================================================
    // SCORE NORMALIZATION
    // =====================================================

    // [5.2.8]
    // Prevents negative engineering scores.
    score =
        Math.max(score, 0);

    // [5.2.9]
    // Prevents engineering overflow.
    score =
        Math.min(score, 100);

    // [5.2.10]
    // Returns finalized engineering score.
    return score;
}

// =====================================================
// ENGINEERING RECOMMENDATION ENGINE
// =====================================================

// [5.2.14]
// Generates intelligent engineering recommendations.
export function generateRecommendations() {

    // [5.2.15]
    // Stores dynamic recommendation collection.
    const recommendations = [];

    // =====================================================
    // ROOF RECOMMENDATIONS
    // =====================================================

    // [5.2.16]
    // Validates roof engineering systems.
    if (
        energyState.roof
            ?.installedSystems
            .length === 0
    ) {

        recommendations.push(
            "Consider installing roof upgrades."
        );
    }

    // =====================================================
    // WALL RECOMMENDATIONS
    // =====================================================

    // [5.2.17]
    // Validates wall engineering systems.
    if (
        energyState.walls
            ?.installedSystems
            .length === 0
    ) {

        recommendations.push(
            "Wall insulation improvements recommended."
        );
    }

    // =====================================================
    // WINDOW RECOMMENDATIONS
    // =====================================================

    // [5.2.18]
    // Validates efficient window systems.
    if (
        energyState.windows
            ?.installedSystems
            .length === 0
    ) {

        recommendations.push(
            "Upgrade to energy efficient windows."
        );
    }

    // [5.2.19]
    // Returns intelligent recommendations.
    return recommendations;
}