// =====================================================
// [18.5.1]
// BUILDING PRESENTATION SERVICE
// =====================================================
//
// Synchronizes the active building context with the
// centralized building presentation state.
//
// This service connects:
//
// buildingContextState
//          ↓
// buildingPresentationResolver
//          ↓
// buildingPresentationState
//
// This service does NOT:
// - manipulate the DOM
// - render SVG
// - handle user interaction
// - calculate energy scores
// - install engineering systems
// - modify energyState
//
// Presentation rendering remains a separate concern.
// =====================================================


import {
    buildingContextState
} from "../core/buildingContextState.js";


import {
    buildingPresentationState
} from "../core/buildingPresentationState.js";


import {
    resolveBuildingPresentation
} from "./buildingPresentationResolver.js";


// =====================================================
// [18.5.2]
// SYNCHRONIZE BUILDING PRESENTATION
// =====================================================
//
// Resolves the presentation from the currently active
// building context and stores the result centrally.
//
// This is the controlled presentation-state mutation
// boundary.
// =====================================================

export function synchronizeBuildingPresentation() {

    // =================================================
    // [18.5.3]
    // Retrieve the currently active building profile.
    // =================================================

    const buildingProfile =
        buildingContextState.profile;


    // =================================================
    // [18.5.4]
    // Resolve the presentation from the active profile.
    //
    // The resolver remains responsible for deciding
    // which contextual zones belong to the presentation.
    // =================================================

    const presentation =
        resolveBuildingPresentation(
            buildingProfile
        );


    // =================================================
    // [18.5.5]
    // Store the resolved presentation centrally.
    //
    // The state module remains responsible only for
    // storing the current presentation.
    // =================================================

    buildingPresentationState.presentation =
        presentation;


    // =================================================
    // [18.5.6]
    // Return the resolved presentation.
    //
    // Returning the value allows the caller to continue
    // working with the result without directly accessing
    // presentation state.
    // =================================================

    return presentation;

}