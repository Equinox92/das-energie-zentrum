// =====================================================
// [16.3.1]
// Centralized energy assessment calculation service.
//
// This service converts validated property inputs into
// a transparent weighted energy-efficiency assessment.
//
// IMPORTANT:
// The UI must never contain assessment calculations.
// =====================================================


// =====================================================
// [16.3.2]
// Calculates annual energy consumption intensity.
//
// This normalizes annual consumption against property
// floor area so different property sizes can be compared.
// =====================================================

function calculateConsumptionIntensity(
    annualConsumptionKwh,
    houseSizeM2
) {

    return (
        annualConsumptionKwh /
        houseSizeM2
    );
}


// =====================================================
// [16.3.3]
// Calculates the consumption-efficiency score.
//
// Lower energy consumption per square metre produces
// a higher efficiency score.
// =====================================================

function calculateConsumptionScore(
    consumptionIntensity
) {

    if (consumptionIntensity <= 50) {

        return 100;
    }

    if (consumptionIntensity <= 100) {

        return 90;
    }

    if (consumptionIntensity <= 150) {

        return 80;
    }

    if (consumptionIntensity <= 200) {

        return 70;
    }

    if (consumptionIntensity <= 250) {

        return 60;
    }

    if (consumptionIntensity <= 300) {

        return 50;
    }

    if (consumptionIntensity <= 400) {

        return 40;
    }

    if (consumptionIntensity <= 500) {

        return 30;
    }

    return 20;
}


// =====================================================
// [16.3.4]
// Calculates the building-age score.
//
// Newer buildings generally receive a stronger starting
// efficiency score because modern construction standards
// tend to provide improved energy performance.
//
// This is intentionally only one component of the model.
// =====================================================

function calculateBuildingAgeScore(
    yearBuilt
) {

    const currentYear =
        new Date().getFullYear();

    const buildingAge =
        currentYear -
        yearBuilt;


    if (buildingAge <= 10) {

        return 100;
    }

    if (buildingAge <= 20) {

        return 90;
    }

    if (buildingAge <= 30) {

        return 80;
    }

    if (buildingAge <= 40) {

        return 70;
    }

    if (buildingAge <= 50) {

        return 60;
    }

    if (buildingAge <= 75) {

        return 50;
    }

    if (buildingAge <= 100) {

        return 40;
    }

    return 30;
}


// =====================================================
// [16.3.5]
// Calculates heating-system score.
//
// Heating systems receive different efficiency scores.
// These values are intentionally kept centralized so
// they can later be replaced by a more sophisticated
// engineering model without changing the UI.
// =====================================================

function calculateHeatingScore(
    heatingType
) {

    const heatingScores = {

        "heat-pump":
            100,

        "district-heating":
            85,

        "wood-pellet":
            75,

        "electric":
            65,

        "natural-gas":
            55,

        "gas":
            55,

        "oil":
            40,

        "other":
            50

    };


    return (
        heatingScores[heatingType] ??
        50
    );
}


// =====================================================
// [16.3.6]
// Defines assessment weighting.
//
// Consumption receives the greatest weighting because
// measured annual energy demand is the strongest direct
// indicator available in the current calculator model.
// =====================================================

const assessmentWeights = {

    consumption:
        0.50,

    buildingAge:
        0.20,

    heating:
        0.30
};


// =====================================================
// [16.3.7]
// Calculates the weighted assessment score.
// =====================================================

function calculateWeightedScore(
    consumptionScore,
    buildingAgeScore,
    heatingScore
) {

    const score =

        (
            consumptionScore *
            assessmentWeights.consumption
        )

        +

        (
            buildingAgeScore *
            assessmentWeights.buildingAge
        )

        +

        (
            heatingScore *
            assessmentWeights.heating
        );


    return Math.round(score);
}


// =====================================================
// [16.3.8]
// Converts the numerical score into a human-readable
// assessment classification.
// =====================================================

function classifyAssessment(
    score
) {

    if (score >= 90) {

        return {

            level:
                "excellent",

            label:
                "Excellent",

            description:
                "The property demonstrates very strong energy-efficiency characteristics."

        };
    }


    if (score >= 75) {

        return {

            level:
                "good",

            label:
                "Good",

            description:
                "The property demonstrates generally good energy-efficiency characteristics."

        };
    }


    if (score >= 60) {

        return {

            level:
                "moderate",

            label:
                "Moderate",

            description:
                "The property has several opportunities for energy-efficiency improvement."

        };
    }


    if (score >= 40) {

        return {

            level:
                "poor",

            label:
                "Poor",

            description:
                "The property shows significant opportunities for energy-efficiency improvement."

        };
    }


    return {

        level:
            "critical",

        label:
            "Critical",

        description:
            "The property may benefit substantially from a professional energy assessment."

    };
}


// =====================================================
// [16.3.9]
// Generates the complete assessment result.
// =====================================================

export function assessProperty(
    propertyData
) {

    const {

        houseSizeM2,
        heatingType,
        annualConsumptionKwh,
        yearBuilt

    } = propertyData;


    // =================================================
    // [16.3.10]
    // Calculate normalized energy consumption.
    // =================================================

    const consumptionIntensity =
        calculateConsumptionIntensity(
            annualConsumptionKwh,
            houseSizeM2
        );


    // =================================================
    // [16.3.11]
    // Calculate individual assessment components.
    // =================================================

    const consumptionScore =
        calculateConsumptionScore(
            consumptionIntensity
        );


    const buildingAgeScore =
        calculateBuildingAgeScore(
            yearBuilt
        );


    const heatingScore =
        calculateHeatingScore(
            heatingType
        );


    // =================================================
    // [16.3.12]
    // Calculate weighted overall score.
    // =================================================

    const overallScore =
        calculateWeightedScore(
            consumptionScore,
            buildingAgeScore,
            heatingScore
        );


    // =================================================
    // [16.3.13]
    // Determine assessment classification.
    // =================================================

    const classification =
        classifyAssessment(
            overallScore
        );


    // =================================================
    // [16.3.14]
    // Return complete structured assessment.
    // =================================================

    return {

        score:
            overallScore,

        classification,

        metrics: {

            consumptionIntensity,

            consumptionScore,

            buildingAgeScore,

            heatingScore

        },

        weights:
            assessmentWeights

    };
}