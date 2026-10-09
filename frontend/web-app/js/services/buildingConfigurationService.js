// =====================================================
// [19.2.6]
// BUILDING CONFIGURATION SERVICE
// =====================================================
//
// Resolves and synchronizes building configuration.
//
// This service is responsible for coordinating
// building configuration state.
//
// It does NOT:
// - render the building
// - manipulate the DOM
// - calculate energy scores
// - determine final thermal performance
//
// Engineering interpretation will be introduced
// through dedicated services later.
// =====================================================

import {
    atticConfigurations,
    defaultAtticConfiguration
} from "../data/buildingConfigurationData.js";

import {
    buildingConfigurationApplicability,
    defaultBuildingConfigurationApplicability
} from "../data/buildingConfigurationApplicabilityData.js";

import {
    buildingConfigurationState
} from "../core/buildingConfigurationState.js";


// =====================================================
// [19.2.7]
// RESOLVE BUILDING CONFIGURATION APPLICABILITY
// =====================================================
//
// Determines which configurations are valid for the
// supplied building type.
// =====================================================

export function resolveBuildingConfigurationApplicability(
    buildingType
) {

    if (
        !buildingType
    ) {
        return defaultBuildingConfigurationApplicability;
    }

    return (
        buildingConfigurationApplicability[
            buildingType
        ] ??
        defaultBuildingConfigurationApplicability
    );
}


// =====================================================
// [19.2.8]
// RESOLVE ATTIC CONFIGURATION
// =====================================================

export function resolveAtticConfiguration(
    atticConfiguration
) {

    if (
        !atticConfiguration
    ) {
        return defaultAtticConfiguration;
    }

    return (
        atticConfigurations[
            atticConfiguration
        ] ??
        defaultAtticConfiguration
    );
}


// =====================================================
// [19.2.9]
// VALIDATE ATTIC CONFIGURATION AGAINST
// BUILDING TYPE
// =====================================================
//
// The configuration must first exist in the global
// attic configuration domain.
//
// It must then be permitted by the building type.
// =====================================================

export function resolveApplicableAtticConfiguration(
    buildingType,
    atticConfiguration
) {

    const applicability =
        resolveBuildingConfigurationApplicability(
            buildingType
        );

    const resolvedAtticConfiguration =
        resolveAtticConfiguration(
            atticConfiguration
        );

    if (
        !applicability.atticConfigurations.includes(
            resolvedAtticConfiguration.id
        )
    ) {
        return defaultAtticConfiguration;
    }

    return resolvedAtticConfiguration;
}


// =====================================================
// [19.2.10]
// SYNCHRONIZE BUILDING CONFIGURATION STATE
// =====================================================

export function synchronizeBuildingConfiguration(
    buildingType,
    atticConfiguration
) {

    const resolvedAtticConfiguration =
        resolveApplicableAtticConfiguration(
            buildingType,
            atticConfiguration
        );

    buildingConfigurationState.buildingType =
        buildingType ??
        null;

    buildingConfigurationState.atticConfiguration =
        resolvedAtticConfiguration.id;

    return {
        buildingType:
            buildingConfigurationState.buildingType,

        atticConfiguration:
            resolvedAtticConfiguration
    };
}

// =====================================================
// [19.4.1]
// RESOLVE PHYSICAL BUILDING CONFIGURATION
// =====================================================
//
// Translates the logical building configuration into
// a physical building configuration model.
//
// This function does NOT:
// - calculate thermal performance
// - determine heat-loss values
// - calculate renovation scores
// - manipulate the DOM
// - render geometry
//
// It establishes the physical configuration required
// by later thermal-boundary and 3D presentation layers.
// =====================================================

export function resolvePhysicalBuildingConfiguration(
    buildingType,
    atticConfiguration
) {

    // [19.4.2]
    // Resolve the building configuration through the
    // existing applicability rules.
    const resolvedConfiguration =
        synchronizeBuildingConfiguration(
            buildingType,
            atticConfiguration
        );


    // [19.4.3]
    // Determine the physical building envelope
    // configuration from the resolved attic state.
    //
    // At this stage we describe the physical arrangement
    // only. Thermal-boundary interpretation comes later.

    let buildingEnvelopeConfiguration;


    // [19.4.4]
    // A heated attic places the heated building space
    // within the roof volume.
    if (
        resolvedConfiguration.atticConfiguration.id ===
        "heated"
    ) {

        buildingEnvelopeConfiguration = {
            attic: "heated",
            upperBoundary: "roof"
        };

    }


    // [19.4.5]
    // An unheated attic separates the heated building
    // space from the roof through the attic floor/slab.
    else if (
        resolvedConfiguration.atticConfiguration.id ===
        "unheated"
    ) {

        buildingEnvelopeConfiguration = {
            attic: "unheated",
            upperBoundary: "ceiling-slab"
        };

    }


    // [19.4.6]
    // No attic means the current model does not contain
    // a separate attic volume.
    else {

        buildingEnvelopeConfiguration = {
            attic: "none",
            upperBoundary: "roof"
        };

    }


    // [19.4.7]
    // Return the complete physical configuration model.
    // =====================================================
    // [19.8.1]
    // BUILD PHYSICAL CONFIGURATION MODEL
    // =====================================================
    //
    // Creates the complete physical building configuration
    // object from the resolved logical configuration.
    //
    // This object represents the current physical building
    // arrangement and does not perform thermal calculations.
    // =====================================================

    const physicalConfiguration = {

        buildingType:
            resolvedConfiguration.buildingType,

        atticConfiguration:
            resolvedConfiguration.atticConfiguration,

        buildingEnvelopeConfiguration

    };


    // =====================================================
    // [19.8.2]
    // STORE PHYSICAL CONFIGURATION IN CENTRAL STATE
    // =====================================================
    //
    // Persists the resolved physical configuration so that
    // other services can consume the same authoritative
    // configuration model without resolving it independently.
    //
    // The state object stores data only.
    // It does not calculate or interpret thermal performance.
    // =====================================================

    buildingConfigurationState.physicalConfiguration =
        physicalConfiguration;

    // =====================================================
    // [19.9A.1]
    // PHYSICAL CONFIGURATION STATE DIAGNOSTIC
    // =====================================================
    //
    // Confirms that the resolved physical configuration
    // has been persisted into centralized state.
    // =====================================================

    console.log(
        "[19.9A] Building configuration state:",
        buildingConfigurationState
    );


    // =====================================================
    // [19.8.3]
    // RETURN PHYSICAL CONFIGURATION
    // =====================================================
    //
    // Returns the same authoritative physical configuration
    // to the caller for immediate use or diagnostics.
    // =====================================================

    return physicalConfiguration;
}