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

// [8.2.1]
// Imports engineering analytics intelligence.
import {

    calculateEstimatedSavings,
    calculateCarbonReduction,
    calculateThermalEfficiency,
    calculateOptimizationLevel

} from "../core/engineeringAnalyticsEngine.js";

// [16.9.10]
// Imports centralized calculator assessment state.
import {
    energyAssessmentState
} from "../core/energyAssessmentState.js";


// [4.4.1]
// Synchronizes dashboard UI with runtime state.
export function updateEnergyDashboard() {

        // =====================================================
    // [16.9.11]
    // CALCULATOR ASSESSMENT STATE
    // =====================================================

    // Retrieves the latest calculator assessment.
    const calculatorAssessment =
        energyAssessmentState.assessment;

        // [16.9.12]
// Outputs the centralized assessment structure
// for development verification.
console.log(
    "[16.9 DEBUG] Complete calculator assessment:",
    JSON.stringify(
    calculatorAssessment,
    null,
    4
    )
);



    // [16.9.13]
    // Retrieves the calculator assessment score.
    const calculatorScore =
        calculatorAssessment?.metrics?.score ??
        calculatorAssessment?.score ??
        null;

    // [4.4.2]
    // Calculates live building score.
    const score =
        calculateEnergyScore();

        console.log(
    "[DASHBOARD DEBUG] Interactive House Score:",
    score
);

console.log(
    "[DASHBOARD DEBUG] Calculator Assessment Score:",
    calculatorScore
);

    // [4.4.3]
    // Generates live recommendations.
    const recommendations =
        generateRecommendations();

        // =====================================================
// [16.9.10]
// Retrieve latest calculator assessment.
// =====================================================


        // =====================================================
// ENGINEERING ANALYTICS
// =====================================================

// =====================================================
// [8.2.2]
// ENGINEERING ANALYTICS AVAILABILITY
// =====================================================

// [8.2.3]
// Determines whether the interactive house contains
// any configured engineering systems.
const hasConfiguredSystems =
    Object.values(
        energyState
    ).some(
        zone =>
            zone &&
            Array.isArray(
                zone.installedSystems
            ) &&
            zone.installedSystems.length > 0
    );


// =====================================================
// [8.2.4]
// ENGINEERING ANALYTICS
// =====================================================

// These metrics belong exclusively to the
// interactive engineering configuration system.
//
// They must NOT manufacture values when no
// engineering systems have been configured.

const estimatedSavings =
    hasConfiguredSystems
        ? calculateEstimatedSavings()
        : null;

const carbonReduction =
    hasConfiguredSystems
        ? calculateCarbonReduction()
        : null;

const thermalEfficiency =
    hasConfiguredSystems
        ? calculateThermalEfficiency()
        : null;

const optimizationLevel =
    hasConfiguredSystems
        ? calculateOptimizationLevel()
        : null;

        // [4.4.4]
// Retrieves live energy score container safely.
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


        // =====================================================
// [16.9.11]
// Retrieve calculator intelligence dashboard elements.
// =====================================================

const calculatorScoreElement =
    document.getElementById(
        "calculator-energy-score"
    );

const calculatorClassificationElement =
    document.getElementById(
        "calculator-classification"
    );

        // [8.2.6]
// Retrieves engineering analytics containers.
const savingsElement =
    document.getElementById(
        "estimated-savings"
    );

const carbonElement =
    document.getElementById(
        "carbon-reduction"
    );

const thermalElement =
    document.getElementById(
        "thermal-efficiency"
    );

const optimizationElement =
    document.getElementById(
        "optimization-level"
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

// =====================================================
// [16.9.14]
// Render calculator intelligence assessment.
// =====================================================

if (calculatorAssessment) {

    if (calculatorScoreElement) {

        calculatorScoreElement.textContent =
            calculatorScore !== null
                ? `${calculatorScore}%`
                : "Awaiting Assessment";

    }


    if (calculatorClassificationElement) {

        const calculatorClassification =
            calculatorAssessment?.metrics?.classification ??
            calculatorAssessment?.classification ??
            "Assessment Available";

        calculatorClassificationElement.textContent =
            calculatorClassification;

    }

}

    // [4.4.7]
    // Updates live building efficiency score.
    scoreElement.textContent =
        `${score}%`;

        // =====================================================
// LIVE ENGINEERING ANALYTICS SYNCHRONIZATION
// =====================================================

// =====================================================
// [8.2.7]
// RENDER ENGINEERING ANALYTICS
// =====================================================

// [8.2.8]
// Displays engineering savings only when
// engineering systems actually exist.
if (savingsElement) {

    savingsElement.textContent =
        hasConfiguredSystems
            ? `R ${estimatedSavings.toLocaleString()}`
            : "R 0";
}


// [8.2.9]
// Displays carbon reduction only when
// engineering systems actually exist.
if (carbonElement) {

    carbonElement.textContent =
        hasConfiguredSystems
            ? `${carbonReduction}%`
            : "0%";
}


// [8.2.10]
// Displays thermal efficiency only when
// engineering systems actually exist.
if (thermalElement) {

    thermalElement.textContent =
        hasConfiguredSystems
            ? thermalEfficiency
            : "Awaiting Configuration";
}


// [8.2.11]
// Displays optimization classification only
// when engineering systems actually exist.
if (optimizationElement) {

    optimizationElement.textContent =
        hasConfiguredSystems
            ? optimizationLevel
            : "Awaiting Configuration";
}

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