// =====================================================
// [19.1.4]
// CENTRAL BUILDING CONFIGURATION DOMAIN DATA
// =====================================================
//
// Defines supported physical building configurations.
//
// This file contains domain data only.
//
// It does NOT:
// - read application state
// - manipulate the DOM
// - calculate energy scores
// - determine thermal boundaries
// - render 3D geometry
// =====================================================

export const atticConfigurations = {

    // =================================================
    // [19.1.5]
    // NO RELEVANT ATTIC
    // =================================================

    none: {
        id:
            "none",

        name:
            "No Attic",

        description:
            "The building has no modeled attic space within the current configuration."
    },

    // =================================================
    // [19.1.6]
    // UNHEATED ATTIC
    // =================================================

    unheated: {
        id:
            "unheated",

        name:
            "Unheated Attic",

        description:
            "The attic exists but is outside the heated living envelope."
    },

    // =================================================
    // [19.1.7]
    // HEATED ATTIC
    // =================================================

    heated: {
        id:
            "heated",

        name:
            "Heated Attic",

        description:
            "The attic is included within the heated building envelope."
    }
};

export const defaultAtticConfiguration =
    atticConfigurations.none;