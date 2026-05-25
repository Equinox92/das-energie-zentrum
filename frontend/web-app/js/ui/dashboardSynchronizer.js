import {
    calculateEnergyScore,
    generateRecommendations
} from "../core/energyRelationshipEngine.js";

import {
    renderInstalledSystems
} from "./visualSystemRenderer.js";

import {
    saveEngineeringState
} from "../services/persistenceService.js";

import {
    energyState
} from "../core/energyState.js";


// [4.4.1]
// Synchronizes dashboard UI with runtime state.
export function updateEnergyDashboard() {

    // [4.4.2]
    // Calculates live building score.
    const score =
        calculateEnergyScore();

    // [4.4.3]
    // Generates live recommendations.
    const recommendations =
        generateRecommendations();

    // [4.4.4]
    // Retrieves score container safely.
    const scoreElement =
        document.getElementById(
            "energy-score"
        );

    // [4.4.5]
    // Retrieves recommendation container safely.
    const recommendationElement =
        document.getElementById(
            "energy-recommendations"
        );

    // [4.4.6]
    // Prevents runtime UI synchronization failure.
    if (
        !scoreElement ||
        !recommendationElement
    ) {

        console.warn(
            "Dashboard containers missing."
        );

        return;
    }

    // [4.4.7]
    // Updates live building efficiency score.
    scoreElement.textContent =
        `${score}%`;

    // [4.4.8]
    // Renders dynamic recommendation list.
    recommendationElement.innerHTML =
        recommendations.map(
            recommendation =>
                `<li>${recommendation}</li>`
        ).join("");

    // [4.4.9]
    // Synchronizes SVG visualization layer.
    renderInstalledSystems();

    // [6.6.2]
// Automatically persists runtime engineering state.
saveEngineeringState(
    energyState
);

    // [4.9.1]
// Retrieves intelligent CTA containers safely.
const ctaHeading =
    document.getElementById(
        "cta-heading"
    );

const ctaDescription =
    document.getElementById(
        "cta-description"
    );

// [4.9.2]
// Synchronizes adaptive CTA messaging.
if (
    ctaHeading &&
    ctaDescription
) {

    // [4.9.3]
    // Handles low-efficiency building state.
    if (score <= 25) {

        ctaHeading.textContent =
            "Urgent Energy Improvements Recommended";

        ctaDescription.textContent =
            "Your building may be losing significant energy efficiency. Book a professional consultation.";

    }

    // [4.9.4]
    // Handles medium-efficiency building state.
    else if (score <= 50) {

        ctaHeading.textContent =
            "Energy Optimization Opportunities Available";

        ctaDescription.textContent =
            "Your building has strong improvement potential. Explore optimized energy solutions.";

    }

    // [4.9.5]
    // Handles high-efficiency building state.
    else if (score <= 75) {

        ctaHeading.textContent =
            "Strong Energy Profile Detected";

        ctaDescription.textContent =
            "Your property is performing well. Additional optimization can further reduce operational costs.";

    }

    // [4.9.6]
    // Handles excellent-efficiency building state.
    else {

        ctaHeading.textContent =
            "Excellent Energy Efficiency";

        ctaDescription.textContent =
            "Your configured systems indicate a highly optimized energy profile.";
    }
}

    // [4.4.10]
    // Outputs scalable synchronization trace.
    console.log(
        "Dashboard synchronized."
    );
}