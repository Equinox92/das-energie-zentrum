// =====================================================
// [19.17.1]
// HEATED ENVELOPE DIMENSIONS DATA
// =====================================================
//
// Defines the domain structure available for representing
// physical dimensions of the currently heated envelope.
//
// This file contains domain data only.
//
// It does NOT:
// - collect user input
// - calculate heated volume
// - calculate heat loss
// - calculate energy demand
// - calculate fuel consumption
// - interpret building configuration
// - resolve thermal boundaries
// - manipulate the DOM
//
// The actual dimensional methodology is represented here
// as explicit estimation assumptions.
//
// Calculation of heated volume remains the responsibility
// of a dedicated service layer.
// =====================================================


// =====================================================
// [19.17.2]
// HEATED ENVELOPE DIMENSION TYPES
// =====================================================
//
// These identifiers describe the conceptual dimensions
// available to the heated-envelope model.
//
// They do not imply that physical dimensions are directly
// entered by the user.
// =====================================================

export const heatedEnvelopeDimensionTypes = {

    length:
        "length",

    width:
        "width",

    height:
        "height"
};


// =====================================================
// [19.20.1]
// HEATED VOLUME ESTIMATION ASSUMPTIONS
// =====================================================
//
// Defines transparent estimation assumptions used by the
// future heated-volume calculation.
//
// These values are intentionally approximate.
//
// They are intended for background engineering modelling
// and future PDF reporting.
//
// They are NOT:
// - measured building dimensions
// - architectural measurements
// - statutory GEG calculations
// - DIN V 18599 calculations
// - legally certified energy calculations
// =====================================================

export const heatedVolumeEstimationAssumptions = {

    // =================================================
    // [19.20.2]
    // BASE HEATED HEIGHT
    // =================================================
    //
    // Represents the assumed average heated floor-to-
    // ceiling height used when physical dimensions are
    // not directly supplied.
    //
    // The value is an engineering estimation assumption.
    // =================================================

    baselineHeatedHeightM:
        2.50,


    // =================================================
    // [19.20.3]
    // HEATED ROOF VOLUME FACTOR
    // =================================================
    //
    // Represents the future estimated additional heated
    // roof volume relative to the available heated floor
    // area.
    //
    // This value is intentionally defined as domain data
    // rather than being embedded inside a calculation.
    //
    // The calculation itself will be introduced by a
    // dedicated service in a later change.
    // =================================================

    heatedRoofVolumeFactorM3PerM2:
        0.35,


    // =================================================
    // [19.20.4]
    // ESTIMATION STATUS
    // =================================================
    //
    // Explicitly identifies the resulting model as an
    // approximation rather than a measured quantity.
    // =================================================

    estimationStatus:
        "approximate"
};


// =====================================================
// [19.20.5]
// HEATED ENVELOPE VOLUME RULES
// =====================================================
//
// Defines the conceptual treatment of different building
// configurations.
//
// These rules describe behaviour only.
//
// They do NOT calculate volume.
// =====================================================

export const heatedEnvelopeVolumeRules = {

    heatedAttic:
        "include-heated-roof-volume",

    unheatedAttic:
        "exclude-unheated-roof-volume",

    noAttic:
        "exclude-additional-roof-volume",

    heatedBasement:
        "include-heated-basement-volume",

    unheatedBasement:
        "exclude-unheated-basement-volume"
};


// =====================================================
// [19.20.6]
// DEFAULT HEATED ENVELOPE DIMENSIONS
// =====================================================
//
// Provides the unresolved default dimension model.
//
// Null values remain intentional because physical
// dimensions are not directly collected from the user.
//
// The estimation model will use the existing building
// information instead of introducing new user-facing
// dimension fields.
// =====================================================

export const defaultHeatedEnvelopeDimensions = {

    id:
        "unknown",

    geometryType:
        "unresolved",

    length:
        null,

    width:
        null,

    height:
        null,

    unit:
        "m",

    dimensionStatus:
        "unresolved",

    volumeEstimationStatus:
        "approximate"
};