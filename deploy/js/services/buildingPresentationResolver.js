// =====================================================
// [18.3.1]
// BUILDING PRESENTATION RESOLVER
// =====================================================
//
// Resolves the contextual building presentation from:
//
// - the active building profile
// - the heat-loss opportunity model
//
// This service creates the contract between domain
// intelligence and the visual building presentation.
//
// It does NOT:
// - manipulate the DOM
// - render SVG
// - handle user interaction
// - calculate energy assessment scores
// - modify energyState
// - install engineering systems
//
// The presentation layer consumes the resolved result.
// =====================================================


import {
    getHeatLossOpportunities
} from "./heatLossOpportunityService.js";


// =====================================================
// [18.3.2]
// PRESENTATION ZONE DEFINITIONS
// =====================================================
//
// These identifiers represent building presentation
// components rather than SVG elements.
//
// This distinction is important.
//
// The domain model may contain a component before the
// current SVG is capable of visually representing it.
//
// Therefore:
//
// domain component != SVG interaction zone
//
// The presentation resolver bridges that difference.
// =====================================================

// =====================================================
// [18.11.2]
// PRESENTATION STATE DEFINITIONS
// =====================================================
//
// The presentation layer distinguishes domain
// applicability from current visual capability.
//
// These states are deliberately separate:
//
// AVAILABLE
//     The building component applies to the building.
//
// INTERACTIVE
//     The component applies and is represented by the
//     current interactive SVG.
//
// FUTURE
//     The component applies but is not yet represented
//     by the current SVG.
//
// NOT_APPLICABLE
//     The component does not apply to the building.
//
// The resolver currently receives only applicable
// opportunities from the domain service. Therefore
// NOT_APPLICABLE is part of the presentation vocabulary
// but is not currently emitted into the zones collection.
// =====================================================

const PRESENTATION_STATES = {

    AVAILABLE:
        "available",

    INTERACTIVE:
        "interactive",

    FUTURE:
        "future",

    NOT_APPLICABLE:
        "not-applicable"

};


// =====================================================
// [18.11.3]
// PRESENTATION ZONE DEFINITIONS
// =====================================================
//
// These definitions describe the current visual
// capabilities of the application.
//
// Domain availability remains controlled by the
// building profile and heat-loss opportunity service.
//
// This object only describes presentation capability.
// =====================================================

const presentationZoneDefinitions = {

    roof: {

        id:
            "roof",

        presentationState:
            PRESENTATION_STATES.INTERACTIVE,

        currentSvgZone:
            true

    },


    walls: {

        id:
            "walls",

        presentationState:
            PRESENTATION_STATES.INTERACTIVE,

        currentSvgZone:
            true

    },


    windows: {

        id:
            "windows",

        presentationState:
            PRESENTATION_STATES.INTERACTIVE,

        currentSvgZone:
            true

    },


    basement: {

        id:
            "basement",

        presentationState:
            PRESENTATION_STATES.FUTURE,

        currentSvgZone:
            false

    },


    "floor-ceiling": {

        id:
            "floor-ceiling",

        presentationState:
            PRESENTATION_STATES.FUTURE,

        currentSvgZone:
            false

    }

};

// =====================================================
// [18.3.3]
// RESOLVE BUILDING PRESENTATION
// =====================================================
//
// Combines building profile capabilities with the
// heat-loss opportunity model.
//
// The result is a presentation contract.
//
// No application state is modified.
// =====================================================

export function resolveBuildingPresentation(
    buildingProfile
) {

    // =================================================
    // [18.3.4]
    // Safely handle missing building context.
    // =================================================

    if (!buildingProfile) {

        return {

            buildingType: "unknown",

            buildingName: "Unknown Building",

            zones: [],

            interactiveZones: [],

            futureZones: []

        };

    }


    // =================================================
    // [18.3.5]
    // Retrieve contextual heat-loss opportunities.
    // =================================================

    const opportunities =
        getHeatLossOpportunities(
            buildingProfile
        );


    // =================================================
    // [18.3.6]
    // Resolve presentation metadata for each
    // contextual opportunity.
    // =================================================

    const zones =
        opportunities.map(
            opportunity => {

                const definition =
                    presentationZoneDefinitions[
                        opportunity.id
                    ];


                // =========================================
                // [18.3.7]
                // Safely handle an opportunity that has
                // no presentation definition yet.
                // =========================================

                if (!definition) {

                    return {

                        ...opportunity,

                        presentationState:
                            PRESENTATION_STATES.FUTURE,

                        currentSvgZone:
                            false

                    };

                }


                // =========================================
                // [18.3.8]
                // Return normalized presentation contract.
                // =========================================

// =========================================
// [18.11.4]
// Return normalized presentation contract.
//
// The presentation state explicitly describes
// the current visual capability of the component.
// =========================================

return {

    ...opportunity,

    presentationState:
        definition.presentationState,

    currentSvgZone:
        definition.currentSvgZone

};
            }
        );


    // =================================================
    // [18.3.9]
    // Separate currently interactive zones from
    // future presentation zones.
    // =================================================

// =================================================
// [18.11.5]
// Resolve currently interactive presentation zones.
//
// Only components explicitly marked as interactive
// are exposed through the interactive collection.
// =================================================

const interactiveZones =
    zones.filter(
        zone =>
            zone.presentationState ===
            PRESENTATION_STATES.INTERACTIVE
    );


// =================================================
// [18.11.6]
// Resolve future presentation zones.
//
// These components belong to the building's
// contextual opportunity model but are not yet
// represented by the current SVG.
// =================================================

const futureZones =
    zones.filter(
        zone =>
            zone.presentationState ===
            PRESENTATION_STATES.FUTURE
    );


    // =================================================
    // [18.3.10]
    // Return the complete building presentation contract.
    // =================================================

    return {

        buildingType:
            buildingProfile.id,

        buildingName:
            buildingProfile.name,

        zones,

        interactiveZones,

        futureZones

    };

}