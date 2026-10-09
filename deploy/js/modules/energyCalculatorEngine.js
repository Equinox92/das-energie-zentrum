// [16.3.1]
// Defines the centralized energy assessment calculation engine.

// [16.3.2]
// Imports centralized calculator state.
import {
    energyCalculatorState
} from "../core/energyCalculatorState.js";

// [16.3.3]
// Imports centralized calculator configuration.
import {
    energyCalculatorData
} from "../data/energyCalculatorData.js";

// =====================================================
// [17.6.1]
// BUILDING CONTEXT STATE
// =====================================================
//
// Provides the resolved building profile to the
// assessment intelligence engine.
//
// The engine consumes context.
// It does not resolve the context itself.
// =====================================================

import {
    buildingContextState
} from "../core/buildingContextState.js";


// =====================================================
// [16.3.4]
// ENERGY CALCULATOR ENGINE
// =====================================================

/**
 * Calculates the property's energy assessment.
 *
 * This engine contains business logic only.
 *
 * It does not:
 * - manipulate the DOM
 * - update HTML
 * - display messages
 * - handle button clicks
 *
 * Those responsibilities belong to the UI/application layer.
 *
 * @returns {Object} calculated assessment result
 */
export function calculateEnergyAssessment() {

    // =====================================================
    // [16.3.5]
    // Retrieve centralized calculator state.
    // =====================================================

const {
    houseType,
    houseSizeM2,
    occupants,
    heatingType,
    annualConsumptionKwh,
    yearBuilt
} = energyCalculatorState;

// =====================================================
// [17.6.2]
// RETRIEVE BUILDING CONTEXT
// =====================================================
//
// The calculator engine consumes the already-resolved
// building context.
//
// Context resolution remains outside this engine.
// =====================================================

const buildingProfile =
    buildingContextState.profile;

// =====================================================
// [17.6.3]
// VALIDATE BUILDING CONTEXT
// =====================================================
//
// The assessment engine must remain functional even
// if building context has not yet been established.
//
// This protects the calculator from coupling failures.
// =====================================================

const buildingCharacteristics =
    buildingProfile?.characteristics ?? null;

const buildingSystems =
    buildingProfile?.systems ?? null;

// =====================================================
// [17.7.1]
// BUILDING CONTEXT INTELLIGENCE SNAPSHOT
// =====================================================
//
// Normalizes the building characteristics consumed by
// future assessment intelligence.
//
// This layer does not alter the assessment score.
// It establishes a stable context contract for future
// engineering rules.
// =====================================================

const contextIntelligence = {

    externalExposure:
        buildingCharacteristics?.externalExposure ??
        "unknown",

    envelopeComplexity:
        buildingCharacteristics?.envelopeComplexity ??
        "unknown",

    thermalLossRisk:
        buildingCharacteristics?.thermalLossRisk ??
        "unknown",

    solarPotential:
        buildingCharacteristics?.solarPotential ??
        "unknown",

    ventilationPotential:
        buildingCharacteristics?.ventilationPotential ??
        "unknown"

};

// =====================================================
// [17.7.2]
// BUILDING SYSTEM AVAILABILITY SNAPSHOT
// =====================================================
//
// Captures which engineering systems are applicable to
// the active building profile.
//
// This is contextual information only.
// It does not yet modify the assessment score.
// =====================================================

const availableSystems = {

    roof:
        buildingSystems?.roof ??
        false,

    walls:
        buildingSystems?.walls ??
        false,

    windows:
        buildingSystems?.windows ??
        false,

    heating:
        buildingSystems?.heating ??
        false,

    solar:
        buildingSystems?.solar ??
        false,

    basement:
        buildingSystems?.basement ??
        false

};

// =====================================================
// [17.7.4]
// BUILDING CONTEXT INTELLIGENCE DEBUG
// =====================================================
//
// Temporary development verification.
// =====================================================

console.log(
    "[17.7] Assessment context intelligence:",
    {
        buildingType:
            buildingContextState.buildingType,

        characteristics:
            contextIntelligence,

        availableSystems:
            availableSystems
    }
);

    // =====================================================
// [17.6.4]
// BUILDING CONTEXT DEBUG
// =====================================================
//
// Temporary development verification.
// Confirms that assessment intelligence can access
// the centralized building profile.
// =====================================================

console.log(
    "[17.6] Building context received by assessment engine:",
    buildingProfile
);


    // =====================================================
    // [16.3.6]
    // Validate required calculator inputs.
    // =====================================================

if (
    houseType === null ||
    houseSizeM2 === null ||
    occupants === null ||
    heatingType === null ||
    annualConsumptionKwh === null ||
    yearBuilt === null
) {

        return {
            success: false,

            error:
                "All energy assessment inputs are required."
        };
    }


    // =====================================================
    // [16.3.7]
    // Validate property dimensions.
    // =====================================================

    if (
        houseSizeM2 <
            energyCalculatorData.houseSize.min ||

        houseSizeM2 >
            energyCalculatorData.houseSize.max
    ) {

        return {
            success: false,

            error:
                "House size is outside the supported assessment range."
        };
    }


    // =====================================================
    // [16.3.8]
    // Validate occupants.
    // =====================================================

    if (
        occupants <
            energyCalculatorData.occupants.min ||

        occupants >
            energyCalculatorData.occupants.max
    ) {

        return {
            success: false,

            error:
                "Occupant count is outside the supported assessment range."
        };
    }


    // =====================================================
    // [16.3.9]
    // Validate annual energy consumption.
    // =====================================================

    if (
        annualConsumptionKwh <
            energyCalculatorData.annualConsumptionKwh.min ||

        annualConsumptionKwh >
            energyCalculatorData.annualConsumptionKwh.max
    ) {

        return {
            success: false,

            error:
                "Annual energy consumption is outside the supported assessment range."
        };
    }


    // =====================================================
    // [16.3.10]
    // Validate construction year.
    // =====================================================

    if (
        yearBuilt <
            energyCalculatorData.yearBuilt.min ||

        yearBuilt >
            energyCalculatorData.yearBuilt.max
    ) {

        return {
            success: false,

            error:
                "Construction year is outside the supported assessment range."
        };
    }


    // =====================================================
    // [16.3.11]
    // Calculate energy intensity.
    //
    // Energy intensity represents annual energy use
    // relative to the property's floor area.
    // =====================================================

    const energyIntensity =
        annualConsumptionKwh /
        houseSizeM2;


    // =====================================================
    // [16.3.12]
    // Establish base efficiency score.
    //
    // Lower energy intensity produces a higher score.
    // =====================================================

    let score = 100;


    // =====================================================
    // [16.3.13]
    // Apply energy-intensity assessment.
    // =====================================================

    if (energyIntensity <= 50) {

        score += 0;

    } else if (energyIntensity <= 100) {

        score -= 10;

    } else if (energyIntensity <= 150) {

        score -= 20;

    } else if (energyIntensity <= 200) {

        score -= 35;

    } else if (energyIntensity <= 250) {

        score -= 50;

    } else {

        score -= 65;
    }


    // =====================================================
    // [16.3.14]
    // Apply heating-system adjustment.
    // =====================================================

    const heatingAdjustments = {

        "heat-pump": 10,

        "wood-pellet": 6,

        "district-heating": 4,

        "electric": 0,

        "gas": -4,

        "oil": -8,

        "other": -3
    };


    score +=
        heatingAdjustments[
            heatingType
        ] ?? -5;


    // =====================================================
    // [16.3.15]
    // Apply construction-age adjustment.
    // =====================================================

    const currentYear =
        new Date().getFullYear();

    const buildingAge =
        currentYear -
        yearBuilt;


    if (buildingAge <= 10) {

        score += 5;

    } else if (buildingAge <= 25) {

        score += 2;

    } else if (buildingAge <= 50) {

        score -= 3;

    } else if (buildingAge <= 75) {

        score -= 8;

    } else {

        score -= 12;
    }


    // =====================================================
    // [16.3.16]
    // Apply occupancy adjustment.
    //
    // This adjustment is deliberately small because
    // occupancy is contextual rather than a direct
    // building-efficiency measurement.
    // =====================================================

    if (occupants >= 6) {

        score -= 3;

    } else if (occupants <= 2) {

        score += 2;
    }


    // =====================================================
    // [16.3.17]
    // Clamp final score to valid range.
    // =====================================================

    score =
        Math.max(
            0,
            Math.min(
                100,
                Math.round(score)
            )
        );


    // =====================================================
    // [16.3.18]
    // Determine efficiency classification.
    // =====================================================

    let classification;


    if (score >= 85) {

        classification =
            "Excellent";

    } else if (score >= 70) {

        classification =
            "Good";

    } else if (score >= 50) {

        classification =
            "Moderate";

    } else if (score >= 30) {

        classification =
            "Needs Improvement";

    } else {

        classification =
            "Poor";
    }


    // =====================================================
    // [16.3.19]
    // Return centralized assessment result.
    // =====================================================

    return {

        success: true,

        inputs: {

            houseType,

            houseSizeM2,

            occupants,

            heatingType,

            annualConsumptionKwh,

            yearBuilt
        },

            // =====================================================
    // [17.7.3]
    // BUILDING CONTEXT ASSESSMENT DATA
    // =====================================================
    //
    // Exposes the resolved building context alongside
    // the calculated assessment.
    //
    // Future engineering intelligence can consume this
    // structured context without resolving profiles again.
    // =====================================================

    buildingContext: {

        buildingType:
            buildingContextState.buildingType ??
            "unknown",

        profileId:
            buildingProfile?.id ??
            "unknown",

        profileName:
            buildingProfile?.name ??
            "Unknown Building",

        characteristics:
            contextIntelligence,

        availableSystems:
            availableSystems

    },

        metrics: {

            energyIntensity:
                Math.round(
                    energyIntensity
                ),

            buildingAge,

            score,

            classification
        }

    };
}