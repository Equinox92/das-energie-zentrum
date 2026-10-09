// =====================================================
// [19.14.1]
// HEATED ENVELOPE GEOMETRY SERVICE
// =====================================================
//
// Translates the resolved thermal boundary into the
// corresponding heated-envelope geometry definition.
//
// This service does NOT:
// - calculate dimensions
// - calculate heated volume
// - calculate heat loss
// - calculate energy demand
// - calculate fuel consumption
// - calculate renovation scores
// - manipulate the DOM
// - reinterpret building configuration
// - reinterpret attic configuration
//
// The thermal boundary remains the source of truth.
//
// This service creates the next architectural layer:
//
// Thermal Boundary
//        ↓
// Heated Envelope Geometry
// =====================================================

import {
    heatedEnvelopeGeometryTypes,
    heatedEnvelopeGeometryDefinitions,
    defaultHeatedEnvelopeGeometry
} from "../data/heatedEnvelopeGeometryData.js";

import {
    buildingConfigurationState
} from "../core/buildingConfigurationState.js";


// =====================================================
// [19.14.2]
// RESOLVE HEATED ENVELOPE GEOMETRY
// =====================================================
//
// Converts a thermal-boundary model into the matching
// heated-envelope geometry definition.
//
// This function is intentionally pure.
//
// It does not modify centralized state.
// =====================================================

export function resolveHeatedEnvelopeGeometry(
    thermalBoundary
) {

    // =================================================
    // [19.14.3]
    // HANDLE MISSING THERMAL BOUNDARY
    // =================================================
    //
    // Geometry cannot be resolved without a valid
    // thermal-boundary model.
    // =================================================

    if (
        !thermalBoundary
    ) {

        return defaultHeatedEnvelopeGeometry;

    }


    // =================================================
    // [19.14.4]
    // RESOLVE ROOF-BOUNDED GEOMETRY
    // =================================================

    if (
        thermalBoundary.upperBoundary ===
        "roof"
    ) {

        return (
            heatedEnvelopeGeometryDefinitions[
                heatedEnvelopeGeometryTypes.roofBounded
            ]
        );

    }


    // =================================================
    // [19.14.5]
    // RESOLVE CEILING-SLAB-BOUNDED GEOMETRY
    // =================================================

    if (
        thermalBoundary.upperBoundary ===
        "ceiling-slab"
    ) {

        return (
            heatedEnvelopeGeometryDefinitions[
                heatedEnvelopeGeometryTypes.ceilingSlabBounded
            ]
        );

    }


    // =================================================
    // [19.14.6]
    // HANDLE UNSUPPORTED THERMAL BOUNDARY
    // =================================================

    return defaultHeatedEnvelopeGeometry;

}


// =====================================================
// [19.14.7]
// SYNCHRONIZE HEATED ENVELOPE GEOMETRY
// =====================================================
//
// Reads the centralized thermal-boundary state,
// resolves the corresponding heated-envelope geometry,
// and stores the result in centralized configuration
// state.
//
// State remains data-only.
// =====================================================

export function synchronizeHeatedEnvelopeGeometry() {

    const thermalBoundary =
        buildingConfigurationState
            .thermalBoundary;


    const heatedEnvelopeGeometry =
        resolveHeatedEnvelopeGeometry(
            thermalBoundary
        );


    buildingConfigurationState.heatedEnvelopeGeometry =
        heatedEnvelopeGeometry;


    return heatedEnvelopeGeometry;

}