// [3.11.1]
// Imports centralized energy application state.
import { energyState } from "./energyState.js";

// [3.11.2]
// Calculates dynamic energy efficiency score.
export function calculateEnergyScore() {

    // [3.11.3]
    // Initializes temporary scoring accumulator.
    let score = 0;

    // [3.11.4]
    // Applies roof insulation contribution.
    if (energyState.systems.roofInsulation) {
        score += 20;
    }

    // [3.11.5]
    // Applies wall insulation contribution.
    if (energyState.systems.wallInsulation) {
        score += 20;
    }

    // [3.11.6]
    // Applies efficient window contribution.
    if (energyState.systems.efficientWindows) {
        score += 15;
    }

    // [3.11.7]
    // Applies heat pump contribution.
    if (energyState.systems.heatPump) {
        score += 25;
    }

    // [3.11.8]
    // Applies solar panel contribution.
    if (energyState.systems.solarPanels) {
        score += 15;
    }

    // [3.11.9]
    // Applies EV wall-box integration contribution.
    if (energyState.systems.wallBox) {
        score += 5;
    }

    // [3.11.10]
    // Updates centralized application state.
    energyState.efficiencyScore = score;

    // [3.11.11]
    // Returns computed efficiency score.
    return score;
}

// [3.11.12]
// Generates scalable recommendation engine output.
export function generateRecommendations() {

    // [3.11.13]
    // Creates recommendation collection container.
    const recommendations = [];

    // [3.11.14]
    // Adds roof recommendation when missing.
    if (!energyState.systems.roofInsulation) {

        recommendations.push(
            "Upgrade roof insulation."
        );
    }

    // [3.11.15]
    // Adds wall insulation recommendation when missing.
    if (!energyState.systems.wallInsulation) {

        recommendations.push(
            "Improve wall insulation."
        );
    }

    // [3.11.16]
    // Adds heat pump recommendation when missing.
    if (!energyState.systems.heatPump) {

        recommendations.push(
            "Consider installing a heat pump."
        );
    }

    // [3.11.17]
    // Adds solar recommendation when missing.
    if (!energyState.systems.solarPanels) {

        recommendations.push(
            "Install solar panels for renewable energy."
        );
    }

    // [3.11.18]
    // Returns scalable recommendation output.
    return recommendations;
}