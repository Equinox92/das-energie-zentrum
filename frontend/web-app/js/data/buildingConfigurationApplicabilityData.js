// =====================================================
// [19.2.1]
// BUILDING CONFIGURATION APPLICABILITY DATA
// =====================================================
//
// Defines which building configurations are valid for
// each supported building type.
//
// This file contains domain configuration data only.
//
// It does NOT:
// - read application state
// - manipulate the DOM
// - calculate energy scores
// - determine thermal boundaries
// - render 3D geometry
//
// Configuration applicability is deliberately separated
// from the general building profile.
// =====================================================

export const buildingConfigurationApplicability = {

    // =================================================
    // [19.2.2]
    // DETACHED HOUSE
    // =================================================
    //
    // A detached house may contain:
    //
    // - no attic
    // - an unheated attic
    // - a heated attic
    // =================================================

    detached: {

        atticConfigurations: [
            "none",
            "unheated",
            "heated"
        ]
    },


    // =================================================
    // [19.2.3]
    // SEMI-DETACHED HOUSE
    // =================================================
    //
    // The current engineering model permits the same
    // attic configuration choices as a detached house.
    //
    // This remains configurable domain data and can be
    // refined later if project requirements demand a
    // more specific structural distinction.
    // =================================================

    "semi-detached": {

        atticConfigurations: [
            "none",
            "unheated",
            "heated"
        ]
    },


    // =================================================
    // [19.2.4]
    // APARTMENT
    // =================================================
    //
    // The current building model treats an apartment as
    // having no individually configurable attic within
    // this assessment model.
    // =================================================

    apartment: {

        atticConfigurations: [
            "none"
        ]
    }
};


// =====================================================
// [19.2.5]
// DEFAULT APPLICABILITY
// =====================================================
//
// Unknown building types receive no configurable attic
// options rather than inheriting assumptions from another
// building type.
// =====================================================

export const defaultBuildingConfigurationApplicability = {

    atticConfigurations: [
        "none"
    ]
};