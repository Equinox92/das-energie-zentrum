// =====================================================
// [18.12.2.1]
// CENTRALIZED SOLAR RESOURCE DOMAIN DATA
// =====================================================
//
// Defines the configurable solar-resource assumptions
// used by the environmental simulation.
//
// This file contains domain data only.
//
// It does NOT:
// - read environment state
// - manipulate the DOM
// - perform UI updates
// - calculate assessment scores
// - render visualizations
// - install systems
//
// Calculation logic will be introduced separately.
// =====================================================

export const solarResourceData = {

    // =================================================
    // [18.12.2.2]
    // DEFINES GEOGRAPHIC SOLAR RESOURCE SCALE.
    // =================================================
    //
    // The geographic position represents a normalized
    // north-to-south position within Germany.
    //
    // 0   = Northern Germany
    // 50  = Central Germany
    // 100 = Southern Germany
    //
    // The resource index is intentionally normalized.
    // This allows the model to remain configurable
    // without hardcoding a permanent scientific dataset.
    // =================================================

    geographicResourceIndex: [
        {
            position: 0,
            region: "Northern Germany",
            resourceIndex: 0.90
        },

        {
            position: 50,
            region: "Central Germany",
            resourceIndex: 1.00
        },

        {
            position: 100,
            region: "Southern Germany",
            resourceIndex: 1.10
        }
    ],

    // =================================================
    // [18.12.2.3]
    // DEFINES MODEL REFERENCE SOLAR RESOURCE.
    // =================================================
    //
    // This is the configurable annual reference value
    // from which the later solar-resource model can derive
    // estimated kWh/m².
    //
    // It is a model calibration value, not a claim that
    // every location in Germany receives this amount.
    //
    // A future production version can replace this
    // assumption with a validated external dataset.
    // =================================================

    referenceAnnualResourceKwhM2: 1000,

    // =================================================
    // [18.12.2.4]
    // DEFINES SEASONAL RESOURCE DISTRIBUTION.
    // =================================================
    //
    // These values represent the proportion of annual
    // solar resource assigned to each season.
    //
    // The values are intentionally configurable so that
    // the model can later be calibrated against validated
    // regional and seasonal solar-resource data.
    // =================================================

    seasonalFactors: {

        spring: 0.25,

        summer: 0.35,

        autumn: 0.25,

        winter: 0.15
    }
};