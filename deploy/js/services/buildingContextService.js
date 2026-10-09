// =====================================================
// [17.3.1]
// BUILDING CONTEXT SERVICE
// =====================================================
//
// Resolves the active building context used by the
// assessment and intelligence systems.
//
// This service:
// - reads current building information
// - resolves the appropriate building profile
// - provides safe fallback behavior
//
// This service does NOT:
// - manipulate the DOM
// - render UI
// - calculate energy scores
// - generate recommendations
//
// Building configuration remains centralized inside
// buildingProfiles.js.
//
// State synchronization is performed through the
// centralized building context state.
// =====================================================


import {
    getBuildingProfile
} from "../data/buildingProfiles.js";


// =====================================================
// [17.4.1]
// IMPORT CENTRALIZED BUILDING CONTEXT STATE
// =====================================================
//
// The service is the controlled boundary through which
// the active building context is synchronized.
//
// Other modules should not directly mutate
// buildingContextState.
// =====================================================

import {
    buildingContextState
} from "../core/buildingContextState.js";


// =====================================================
// [17.3.2]
// RESOLVE BUILDING CONTEXT
// =====================================================

export function resolveBuildingContext(
    buildingType
) {

    // =================================================
    // [17.3.3]
    // Resolve centralized building profile.
    // =================================================

    const profile =
        getBuildingProfile(
            buildingType
        );


    // =================================================
    // [17.3.4]
    // Return normalized building context.
    //
    // This function does NOT modify application state.
    // =================================================

    return {

        buildingType:
            buildingType ?? "unknown",

        profile,

        characteristics:
            profile.characteristics,

        systems:
            profile.systems

    };

}


// =====================================================
// [17.4.2]
// SYNCHRONIZE BUILDING CONTEXT
// =====================================================
//
// Resolves the selected building profile and stores
// the active building context in centralized state.
//
// This is the controlled state mutation boundary.
//
// The state itself remains deliberately small:
//
// buildingType
// profile
//
// Characteristics and systems remain inside the profile
// rather than being duplicated into application state.
// =====================================================

export function synchronizeBuildingContext(
    buildingType
) {

    // =================================================
    // [17.4.3]
    // Resolve the building context without directly
    // modifying state.
    // =================================================

    const context =
        resolveBuildingContext(
            buildingType
        );


    // =================================================
    // [17.4.4]
    // Synchronize active building type.
    // =================================================

    buildingContextState.buildingType =
        context.buildingType;


    // =================================================
    // [17.4.5]
    // Synchronize resolved building profile.
    // =================================================

    buildingContextState.profile =
        context.profile;


    // =================================================
    // [17.4.6]
    // Return the synchronized context.
    //
    // Returning the context allows the caller to use
    // the resolved result without directly accessing
    // the state object.
    // =================================================

    return context;

}