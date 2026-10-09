// =====================================================
// [17.1.1]
// CENTRALIZED BUILDING PROFILE CONFIGURATION
// =====================================================
//
// Defines the characteristics of supported building types.
//
// This module contains configuration/data only.
//
// It does NOT:
// - manipulate the DOM
// - handle user interaction
// - calculate assessment scores
// - render dashboard information
// - modify application state
//
// Business logic belongs to the appropriate engine.
// UI logic belongs to the UI/controller layer.
// =====================================================


// =====================================================
// [17.1.2]
// BUILDING PROFILES
// =====================================================

export const buildingProfiles = {

    // =================================================
    // [17.1.3]
    // DETACHED HOUSE
    // =================================================

    detached: {

        id: "detached",

        name: "Detached House",

        category: "residential",

        description:
            "A standalone residential building with all external building surfaces exposed.",

        characteristics: {

            externalExposure: "high",

            envelopeComplexity: "high",

            thermalLossRisk: "high",

            solarPotential: "high",

            ventilationPotential: "high"

        },

        systems: {

            roof: true,

            walls: true,

            windows: true,

            heating: true,

            solar: true,

            basement: true

        }

    },


    // =================================================
    // [17.1.4]
    // SEMI-DETACHED HOUSE
    // =================================================

    "semi-detached": {

        id: "semi-detached",

        name: "Semi-Detached House",

        category: "residential",

        description:
            "A residential building sharing one structural wall with an adjacent property.",

        characteristics: {

            externalExposure: "medium",

            envelopeComplexity: "medium",

            thermalLossRisk: "medium",

            solarPotential: "high",

            ventilationPotential: "medium"

        },

        systems: {

            roof: true,

            walls: true,

            windows: true,

            heating: true,

            solar: true,

            basement: true

        }

    },


    // =================================================
    // [17.1.5]
    // APARTMENT
    // =================================================

    apartment: {

        id: "apartment",

        name: "Apartment",

        category: "residential",

        description:
            "A residential unit within a larger multi-unit building.",

        characteristics: {

            externalExposure: "low",

            envelopeComplexity: "low",

            thermalLossRisk: "low",

            solarPotential: "medium",

            ventilationPotential: "medium"

        },

        systems: {

            roof: false,

            walls: true,

            windows: true,

            heating: true,

            solar: false,

            basement: false

        }

    }

};


// =====================================================
// [17.1.6]
// DEFAULT BUILDING PROFILE
// =====================================================
//
// Provides a safe fallback when a building type cannot
// be resolved.
// =====================================================

export const defaultBuildingProfile = {

    id: "unknown",

    name: "Unknown Building",

    category: "unknown",

    description:
        "Building profile has not yet been determined.",

    characteristics: {

        externalExposure: "unknown",

        envelopeComplexity: "unknown",

        thermalLossRisk: "unknown",

        solarPotential: "unknown",

        ventilationPotential: "unknown"

    },

    systems: {

        roof: false,

        walls: false,

        windows: false,

        heating: false,

        solar: false,

        basement: false

    }

};


// =====================================================
// [17.1.7]
// BUILDING PROFILE RESOLVER
// =====================================================
//
// Resolves a building type into its corresponding
// centralized profile.
//
// This function performs lookup only.
// It does not calculate an energy score.
// =====================================================

export function getBuildingProfile(
    buildingType
) {

    if (!buildingType) {

        return defaultBuildingProfile;

    }


    return (
        buildingProfiles[
            buildingType
        ] ??
        defaultBuildingProfile
    );

}