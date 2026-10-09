// =====================================================
// [16.8.1]
// ENERGY CALCULATOR RESULT RENDERER
// =====================================================
//
// Responsibility:
//
// - Render calculator-specific assessment results.
//
// This renderer does NOT:
//
// - modify the interactive-house dashboard
// - calculate engineering analytics
// - modify energyState
// - render engineering-system metrics
// - render engineering recommendations
// - control the interactive SVG
// - control the dashboard synchronizer
// =====================================================


// =====================================================
// [16.8.2]
// RENDER ENERGY ASSESSMENT
// =====================================================

export function renderEnergyAssessment(
    assessment
) {

    // [16.8.3]
    // Safely stop when no valid assessment exists.
    if (
        !assessment ||
        !assessment.success
    ) {

        console.warn(
            "[16.8] No valid energy assessment to render."
        );

        return;
    }


    // =====================================================
    // [16.8.4]
    // Retrieve calculator result container.
    // =====================================================

    const resultElement =
        document.getElementById(
            "energy-calculator-result"
        );


    // [16.8.5]
    // Safely handle missing calculator result container.
    if (!resultElement) {

        console.warn(
            "[16.8] Energy calculator result container not found."
        );

        return;
    }


    // =====================================================
    // [16.8.6]
    // Extract calculator assessment metrics.
    // =====================================================

    const {
        energyIntensity,
        buildingAge,
        score,
        classification
    } = assessment.metrics;

    const {
    houseType
} = assessment.inputs;

const houseTypeLabels = {

    detached:
        "Detached House",

    "semi-detached":
        "Semi-Detached House",

    apartment:
        "Apartment"

};

const houseTypeLabel =
    houseTypeLabels[houseType] ||
    houseType;

    // =====================================================
    // [16.8.7]
    // Render calculator assessment.
    // =====================================================

    resultElement.innerHTML = "";


    const resultHeading =
        document.createElement(
            "h3"
        );

    resultHeading.textContent =
        "Energy Assessment Result";

// =====================================================
// [16.8.X]
// Render house type.
// =====================================================

const houseTypeElement =
    document.createElement(
        "p"
    );

houseTypeElement.textContent =
    `House Type: ${houseTypeLabel}`;


    // =====================================================
    // [16.8.8]
    // Render assessment score.
    // =====================================================

    const scoreElement =
        document.createElement(
            "p"
        );

    scoreElement.textContent =
        `Assessment Score: ${score}%`;


    // =====================================================
    // [16.8.9]
    // Render classification.
    // =====================================================

    const classificationElement =
        document.createElement(
            "p"
        );

    classificationElement.textContent =
        `Classification: ${classification}`;


    // =====================================================
    // [16.8.10]
    // Render energy intensity.
    // =====================================================

    const intensityElement =
        document.createElement(
            "p"
        );

    intensityElement.textContent =
        `Energy Intensity: ${energyIntensity} kWh/m²/year`;


    // =====================================================
    // [16.8.11]
    // Render building age.
    // =====================================================

    const ageElement =
        document.createElement(
            "p"
        );

    ageElement.textContent =
        `Building Age: ${buildingAge} years`;


    // =====================================================
    // [16.8.12]
    // Append calculator results.
    // =====================================================



    resultElement.appendChild(
        resultHeading
    );

    resultElement.appendChild(
        scoreElement
    );

    resultElement.appendChild(
        classificationElement
    );

    resultElement.appendChild(
    houseTypeElement
);

    resultElement.appendChild(
        intensityElement
    );

    resultElement.appendChild(
        ageElement
    );


    // =====================================================
    // [16.8.13]
    // Development diagnostics.
    // =====================================================

    console.log(
        "[16.8] Energy Assessment Rendered:",
        {
            energyIntensity,
            buildingAge,
            score,
            classification
        }
    );

}