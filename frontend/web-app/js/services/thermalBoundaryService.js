// =====================================================
// [19.10.1]
// THERMAL BOUNDARY SERVICE
// =====================================================
//
// Interprets the physical building configuration to
// determine where the heated building envelope ends.
//
// This service does NOT:
// - calculate heat loss
// - calculate energy demand
// - calculate heated volume
// - calculate fuel consumption
// - calculate renovation scores
// - manipulate the DOM
//
// It only translates the physical building configuration
// into a thermal-boundary model.
//
// This creates the architectural foundation for future
// thermal and heated-volume calculations.
// =====================================================

import {
    buildingConfigurationState
} from "../core/buildingConfigurationState.js";


// =====================================================
// [19.10.2]
// THERMAL BOUNDARY IDENTIFIERS
// =====================================================
//
// These identifiers describe possible upper boundaries
// of the current heated building envelope.
// =====================================================

export const thermalBoundaryTypes = {

    roof:
        "roof",

    ceilingSlab:
        "ceiling-slab"

};


// =====================================================
// [19.10.3]
// RESOLVE THERMAL BOUNDARY
// =====================================================
//
// Determines the thermal boundary from the already
// resolved physical building configuration.
//
// The physical configuration remains the source of truth.
// This function does not independently reinterpret the
// building type or attic selection.
// =====================================================

export function resolveThermalBoundary(
    physicalConfiguration
) {

    // =================================================
    // [19.10.4]
    // HANDLE MISSING PHYSICAL CONFIGURATION
    // =================================================
    //
    // No thermal boundary can be resolved until a valid
    // physical building configuration exists.
    // =================================================

    if (
        !physicalConfiguration
    ) {

        return null;

    }


    // =================================================
    // [19.10.5]
    // READ BUILDING ENVELOPE CONFIGURATION
    // =================================================

    const buildingEnvelopeConfiguration =
        physicalConfiguration
            .buildingEnvelopeConfiguration;


    // =================================================
    // [19.10.6]
    // HANDLE MISSING ENVELOPE CONFIGURATION
    // =================================================

    if (
        !buildingEnvelopeConfiguration
    ) {

        return null;

    }


    // =================================================
    // [19.10.7]
    // RESOLVE UPPER THERMAL BOUNDARY
    // =================================================
    //
    // The physical configuration has already determined
    // the physical upper boundary.
    //
    // The thermal service now interprets that boundary
    // as the current upper limit of the heated envelope.
    // =================================================

    const upperBoundary =
        buildingEnvelopeConfiguration.upperBoundary;


    // =================================================
    // [19.10.8]
    // VALIDATE SUPPORTED THERMAL BOUNDARY
    // =================================================

    if (
        upperBoundary !==
            thermalBoundaryTypes.roof &&
        upperBoundary !==
            thermalBoundaryTypes.ceilingSlab
    ) {

        return null;

    }


    // =================================================
    // [19.10.9]
    // BUILD THERMAL BOUNDARY MODEL
    // =================================================

    return {

        upperBoundary,

        source:
            "physical-building-configuration"

    };
}


// =====================================================
// [19.10.10]
// SYNCHRONIZE THERMAL BOUNDARY STATE
// =====================================================
//
// Resolves the thermal boundary from the centralized
// physical configuration and stores the result.
//
// State remains data-only.
// =====================================================

export function synchronizeThermalBoundary() {

    const physicalConfiguration =
        buildingConfigurationState
            .physicalConfiguration;


    const thermalBoundary =
        resolveThermalBoundary(
            physicalConfiguration
        );


    buildingConfigurationState.thermalBoundary =
        thermalBoundary;


    return thermalBoundary;
}