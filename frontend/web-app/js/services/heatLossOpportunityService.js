// =====================================================
// [18.2.1]
// HEAT-LOSS OPPORTUNITY SERVICE
// =====================================================
//
// Converts centralized heat-loss domain data into
// contextual building opportunities.
//
// This service connects:
//
// buildingHeatLossData.js
//          +
// buildingProfiles.js
//
// It does NOT:
// - manipulate the DOM
// - render SVG
// - modify application state
// - calculate energy assessment scores
// - install systems
// - open configuration panels
//
// Its responsibility is contextual interpretation.
// =====================================================


import {
    buildingHeatLossData
} from "../data/buildingHeatLossData.js";


// =====================================================
// [18.2.2]
// BUILDING HEAT-LOSS COMPONENT AVAILABILITY
// =====================================================
//
// Determines whether a heat-loss component is exposed
// by the active building profile.
//
// The service deliberately uses the existing building
// profile system rather than duplicating building rules.
// =====================================================

function isComponentAvailable(
    componentKey,
    buildingProfile
) {

    // =================================================
    // [18.2.3]
    // Safely handle missing building profiles.
    // =================================================

    if (!buildingProfile) {

        return false;

    }


    // =================================================
    // [18.2.4]
    // Retrieve configured system availability.
    // =================================================

    const systems =
        buildingProfile.systems;


    // =================================================
    // [18.2.5]
    // Safely handle profiles without system metadata.
    // =================================================

    if (!systems) {

        return false;

    }


    // =================================================
    // [18.2.6]
    // Resolve the heat-loss component against the
    // centralized building capability configuration.
    //
    // Current mappings:
    //
    // roof       → roof
    // walls      → walls
    // windows    → windows
    // basement   → basement
    //
    // floor-ceiling currently has no corresponding
    // building-profile capability and therefore remains
    // available at the domain-model level only.
    // =================================================

    if (
        componentKey === "floorCeiling"
    ) {

        return true;

    }


    return (
        systems[componentKey] === true
    );

}


// =====================================================
// [18.2.7]
// GET HEAT-LOSS OPPORTUNITIES
// =====================================================
//
// Returns the contextual heat-loss opportunities for
// the supplied building profile.
//
// No state is modified.
// =====================================================

export function getHeatLossOpportunities(
    buildingProfile
) {

    // =================================================
    // [18.2.8]
    // Return an empty collection when no profile exists.
    // =================================================

    if (!buildingProfile) {

        return [];

    }


    // =================================================
    // [18.2.9]
    // Convert centralized heat-loss data into an
    // opportunity collection.
    // =================================================

    return Object.values(
        buildingHeatLossData
    )
        .filter(
            component =>
                isComponentAvailable(
                    component.id === "floor-ceiling"
                        ? "floorCeiling"
                        : component.id,
                    buildingProfile
                )
        )
        .map(
            component => ({

                id:
                    component.id,

                name:
                    component.name,

                heatLossShare:
                    component.heatLossShare,

                unit:
                    component.unit,

                priority:
                    component.priority,

                description:
                    component.description,

                renovationOpportunities:
                    [
                        ...component.renovationOpportunities
                    ]

            })
        );

}


// =====================================================
// [18.2.10]
// GET SINGLE HEAT-LOSS OPPORTUNITY
// =====================================================
//
// Provides controlled lookup of one contextual
// heat-loss component.
//
// Returns null when the component does not exist or
// is unavailable for the supplied building profile.
// =====================================================

export function getHeatLossOpportunity(
    componentKey,
    buildingProfile
) {

    // =================================================
    // [18.2.11]
    // Resolve requested heat-loss component.
    // =================================================

    const component =
        buildingHeatLossData[
            componentKey
        ];


    // =================================================
    // [18.2.12]
    // Prevent invalid component access.
    // =================================================

    if (!component) {

        return null;

    }


    // =================================================
    // [18.2.13]
    // Confirm component availability.
    // =================================================

    if (
        !isComponentAvailable(
            componentKey,
            buildingProfile
        )
    ) {

        return null;

    }


    // =================================================
    // [18.2.14]
    // Return a controlled contextual representation.
    // =================================================

    return {

        id:
            component.id,

        name:
            component.name,

        heatLossShare:
            component.heatLossShare,

        unit:
            component.unit,

        priority:
            component.priority,

        description:
            component.description,

        renovationOpportunities:
            [
                ...component.renovationOpportunities
            ]

    };

}