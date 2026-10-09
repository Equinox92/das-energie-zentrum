// =====================================================
// [19.18.1]
// HEATED ENVELOPE DIMENSIONS SERVICE
// =====================================================
//
// Translates the resolved heated-envelope geometry into
// the corresponding physical-dimensions domain model.
//
// This service establishes the architectural connection:
//
// Heated Envelope Geometry
//        ↓
// Heated Envelope Dimensions
//
// This service does NOT:
// - calculate heated volume
// - calculate heat loss
// - calculate energy demand
// - calculate fuel consumption
// - calculate renovation scores
// - manipulate the DOM
// - collect user input
// - reinterpret the thermal boundary
// - invent physical dimensions
//
// The actual dimensional methodology remains intentionally
// unresolved until the engineering requirements define how
// the building dimensions are to be obtained.
// =====================================================

import {
    defaultHeatedEnvelopeDimensions
} from "../data/heatedEnvelopeDimensionsData.js";

import {
    buildingConfigurationState
} from "../core/buildingConfigurationState.js";

import {
    calculateEstimatedHeatedVolume
} from "./heatedVolumeEstimationService.js";


// =====================================================
// [19.18.2]
// RESOLVE HEATED ENVELOPE DIMENSIONS
// =====================================================
//
// Resolves the current heated-envelope geometry into a
// dimensions model.
//
// No dimensions are calculated here.
//
// The current model therefore remains unresolved until
// physical dimensions are supplied by a future input or
// engineering layer.
// =====================================================

export function resolveHeatedEnvelopeDimensions(
    heatedEnvelopeGeometry
) {

    if (!heatedEnvelopeGeometry) {

        return (
            defaultHeatedEnvelopeDimensions
        );
    }


    return {

        id:
            heatedEnvelopeGeometry.id,

        geometryType:
            heatedEnvelopeGeometry.geometryStatus,

        length:
            null,

        width:
            null,

        height:
            null,

        unit:
            "m",

        dimensionStatus:
            "unresolved"
    };
}


// =====================================================
// [19.18.3]
// SYNCHRONIZE HEATED ENVELOPE DIMENSIONS
// =====================================================
//
// Reads the currently resolved heated-envelope geometry
// from centralized building configuration state.
//
// The resulting dimensions model is stored centrally.
//
// No volume calculation occurs.
// =====================================================

// =====================================================
// [19.22.3]
// SYNCHRONIZE HEATED ENVELOPE DIMENSIONS
// =====================================================
//
// Reads the currently resolved heated-envelope geometry
// and synchronizes the associated estimated heated volume.
//
// The dimensions model and volume estimate remain separate
// responsibilities:
//
// Geometry
//     ↓
// Dimensions model
//     ↓
// Volume estimation service
//
// The service performs the calculation.
// This synchronization layer stores the result.
// =====================================================

export function synchronizeHeatedEnvelopeDimensions() {

    // =================================================
    // [19.22.4]
    // READ HEATED ENVELOPE GEOMETRY
    // =================================================

    const heatedEnvelopeGeometry =
        buildingConfigurationState
            .heatedEnvelopeGeometry;


    // =================================================
    // [19.22.5]
    // RESOLVE DIMENSIONS MODEL
    // =================================================
    //
    // The dimensions model continues to represent the
    // current heated-envelope geometry.
    // =================================================

    const heatedEnvelopeDimensions =
        resolveHeatedEnvelopeDimensions(
            heatedEnvelopeGeometry
        );


    // =================================================
    // [19.22.6]
    // CALCULATE ESTIMATED HEATED VOLUME
    // =================================================
    //
    // Delegates volume calculation to the dedicated
    // heated-volume estimation service.
    //
    // No calculation logic is duplicated here.
    // =================================================

    const heatedVolumeEstimate =
        calculateEstimatedHeatedVolume();


    // =================================================
    // [19.22.7]
    // STORE DIMENSIONS STATE
    // =================================================

    buildingConfigurationState
        .heatedEnvelopeDimensions =
            heatedEnvelopeDimensions;


    // =================================================
    // [19.22.8]
    // STORE ESTIMATED VOLUME STATE
    // =================================================
    //
    // Stores only the derived result.
    //
    // The calculation itself remains inside the
    // heated-volume estimation service.
    // =================================================

    buildingConfigurationState
        .estimatedHeatedVolumeM3 =
            heatedVolumeEstimate
                .estimatedHeatedVolumeM3;


    // =================================================
    // [19.22.9]
    // RETURN DIMENSIONS MODEL
    // =================================================
    //
    // Existing callers continue receiving the dimensions
    // model exactly as before.
    // =================================================

    return (
        heatedEnvelopeDimensions
    );
}