// =====================================================
// [19.23.1]
// HEATED ENVELOPE REPORT SERVICE
// =====================================================
//
// Converts the existing heated-envelope domain state
// into a stable reporting data structure.
//
// This service is the bridge between:
//
// Building Configuration
//        ↓
// Heated Envelope Calculation
//        ↓
// Reporting Model
//        ↓
// Future PDF Generation
//
// This service does NOT:
// - generate PDF files
// - manipulate the DOM
// - modify dashboard scores
// - modify AS-IS assessment scores
// - modify renovation scores
// - collect user input
// - perform statutory GEG calculations
// - perform DIN V 18599 calculations
// - replace professional building measurements
//
// The purpose of this layer is to create a clean,
// predictable reporting contract.
// =====================================================


import {
    buildingConfigurationState
} from "../core/buildingConfigurationState.js";


// =====================================================
// [19.23.2]
// BUILD HEATED ENVELOPE REPORT DATA
// =====================================================
//
// Reads the already-calculated heated-envelope state
// and converts it into reporting information.
//
// No calculation is performed here.
//
// The calculation remains the responsibility of
// heatedVolumeEstimationService.js.
//
// This separation prevents reporting logic from becoming
// coupled to engineering calculations.
// =====================================================

export function buildHeatedEnvelopeReportData() {

    const geometry =
        buildingConfigurationState
            .heatedEnvelopeGeometry;

    const thermalBoundary =
        buildingConfigurationState
            .thermalBoundary;

    const dimensions =
        buildingConfigurationState
            .heatedEnvelopeDimensions;

    const estimatedHeatedVolumeM3 =
        buildingConfigurationState
            .estimatedHeatedVolumeM3;


    // =================================================
    // [19.23.3]
    // RETURN REPORT CONTRACT
    // =================================================
    //
    // The returned object represents the information
    // that a future PDF/report generator may consume.
    //
    // It intentionally contains descriptive information
    // alongside the estimated numerical value.
    // =================================================

    return {

        reportSection:
            "Heated Envelope",

        geometry: {

            id:
                geometry?.id ??
                "unknown",

            name:
                geometry?.name ??
                "Unknown Heated Envelope",

            upperBoundary:
                geometry?.upperBoundary ??
                null
        },

        thermalBoundary: {

            upperBoundary:
                thermalBoundary?.upperBoundary ??
                null,

            source:
                thermalBoundary?.source ??
                null
        },

        dimensions: {

            length:
                dimensions?.length ??
                null,

            width:
                dimensions?.width ??
                null,

            height:
                dimensions?.height ??
                null,

            unit:
                dimensions?.unit ??
                "m"
        },

        estimatedHeatedVolumeM3:
            estimatedHeatedVolumeM3 ??
            null,

        estimationStatus:
            estimatedHeatedVolumeM3 !== null
                ? "approximate"
                : "unresolved",

        methodology:
            "Estimated heated volume derived from the assessed heated floor area and the applicable heated-envelope configuration.",

        professionalCalculationRequired:
            true
    };
}