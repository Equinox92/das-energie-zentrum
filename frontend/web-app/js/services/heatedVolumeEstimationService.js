// =====================================================
// [19.21.1]
// HEATED VOLUME ESTIMATION SERVICE
// =====================================================
//
// Calculates an approximate heated building volume from
// the existing building assessment information.
//
// This service connects:
//
// Energy Calculator House Size
//        ↓
// Heated Volume Estimation Assumptions
//        ↓
// Building Configuration
//        ↓
// Estimated Heated Building Volume
//
// The result is intended for background engineering
// modelling and future PDF reporting.
//
// This service does NOT:
// - modify the AS-IS energy score
// - modify renovation scores
// - manipulate the DOM
// - collect user input
// - generate PDF documents
// - perform statutory GEG calculations
// - perform DIN V 18599 calculations
// - replace professional building measurements
// =====================================================


// =====================================================
// [19.21.2]
// IMPORT ENERGY CALCULATOR STATE
// =====================================================
//
// Provides access to the existing assessed floor area.
//
// The existing calculator remains the authoritative
// source for the building's entered floor-area value.
// =====================================================

import {
    energyCalculatorState
} from "../core/energyCalculatorState.js";


// =====================================================
// [19.21.3]
// IMPORT BUILDING CONFIGURATION STATE
// =====================================================
//
// Provides access to the current attic configuration.
//
// This allows the service to determine whether an
// estimated heated roof contribution should be included.
// =====================================================

import {
    buildingConfigurationState
} from "../core/buildingConfigurationState.js";


// =====================================================
// [19.21.4]
// IMPORT HEATED VOLUME ESTIMATION DATA
// =====================================================
//
// Imports the explicit domain assumptions and rules.
//
// Keeping these values outside the calculation logic
// allows the assumptions to be changed independently.
// =====================================================

import {
    heatedVolumeEstimationAssumptions,
    heatedEnvelopeVolumeRules
} from "../data/heatedEnvelopeDimensionsData.js";


// =====================================================
// [19.21.5]
// CALCULATE ESTIMATED HEATED VOLUME
// =====================================================
//
// Calculates the approximate heated building volume.
//
// Current methodology:
//
// Base heated volume
// = heated floor area × baseline heated height
//
// Heated roof volume
// = heated floor area × roof volume factor
//
// Total estimated heated volume
// = base heated volume + heated roof volume
//
// The roof contribution is only added when the attic is
// explicitly configured as heated.
//
// Unheated attic and no attic configurations receive no
// additional roof-volume contribution.
// =====================================================

export function calculateEstimatedHeatedVolume() {

    // =================================================
    // [19.21.6]
    // READ HOUSE SIZE
    // =================================================
    //
    // Reads the existing calculator floor-area value.
    //
    // No new user input is introduced.
    // =================================================

    const houseSizeM2 =
        Number(
            energyCalculatorState.houseSizeM2
        );


    // =================================================
    // [19.21.7]
    // VALIDATE HOUSE SIZE
    // =================================================
    //
    // A valid positive floor area is required before
    // an estimated volume can be produced.
    // =================================================

    if (
        !Number.isFinite(houseSizeM2) ||
        houseSizeM2 <= 0
    ) {

        return {
            baseHeatedVolumeM3:
                null,

            heatedRoofVolumeM3:
                null,

            estimatedHeatedVolumeM3:
                null,

            estimationStatus:
                "unresolved"
        };
    }


    // =================================================
    // [19.21.8]
    // CALCULATE BASE HEATED VOLUME
    // =================================================
    //
    // Uses the project's baseline heated height
    // assumption.
    // =================================================

    const baseHeatedVolumeM3 =
        houseSizeM2 *
        heatedVolumeEstimationAssumptions
            .baselineHeatedHeightM;


    // =================================================
    // [19.21.9]
    // READ ATTIC CONFIGURATION
    // =================================================
    //
    // The building configuration state determines
    // whether the roof volume is part of the heated
    // envelope.
    // =================================================

    const atticConfiguration =
        buildingConfigurationState
            .atticConfiguration;


    // =================================================
    // [19.21.10]
    // INITIALIZE HEATED ROOF VOLUME
    // =================================================
    //
    // No additional roof volume is assumed by default.
    // =================================================

    let heatedRoofVolumeM3 =
        0;


    // =================================================
    // [19.21.11]
    // INCLUDE HEATED ROOF VOLUME
    // =================================================
    //
    // A heated attic extends the heated envelope into
    // the roof space.
    //
    // The contribution is estimated using the explicit
    // domain factor defined in the data layer.
    // =================================================

    if (
        atticConfiguration ===
        "heated"
    ) {

        heatedRoofVolumeM3 =
            houseSizeM2 *
            heatedVolumeEstimationAssumptions
                .heatedRoofVolumeFactorM3PerM2;
    }


    // =================================================
    // [19.21.12]
    // CALCULATE TOTAL ESTIMATED VOLUME
    // =================================================
    //
    // Combines the base heated volume with any applicable
    // heated roof contribution.
    // =================================================

    const estimatedHeatedVolumeM3 =
        baseHeatedVolumeM3 +
        heatedRoofVolumeM3;


    // =================================================
    // [19.21.13]
    // RETURN ESTIMATION RESULT
    // =================================================
    //
    // Returns a transparent engineering result.
    //
    // The calculation remains independent of UI,
    // dashboard and scoring systems.
    // =================================================

    return {

        baseHeatedVolumeM3,

        heatedRoofVolumeM3,

        estimatedHeatedVolumeM3,

        atticConfiguration,

        estimationStatus:
            heatedVolumeEstimationAssumptions
                .estimationStatus,

        methodology:
            "Estimated heated floor area multiplied by baseline heated height, with an additional estimated roof-volume contribution when the attic is heated.",

        rules: {

            heatedAttic:
                heatedEnvelopeVolumeRules
                    .heatedAttic,

            unheatedAttic:
                heatedEnvelopeVolumeRules
                    .unheatedAttic,

            noAttic:
                heatedEnvelopeVolumeRules
                    .noAttic
        }
    };
}

// =====================================================
// [19.34.1]
// SYNCHRONIZE ESTIMATED HEATED VOLUME
// =====================================================
//
// Persists the calculated heated volume into the
// centralized building configuration state.
//
// This creates the state bridge:
//
// Calculation
//      ↓
// Heated Volume Result
//      ↓
// buildingConfigurationState
//      ↓
// Reporting
//
// This function does NOT:
// - modify energy scores
// - modify renovation scores
// - manipulate the DOM
// - generate reports
// - generate PDFs
// =====================================================

export function synchronizeEstimatedHeatedVolume() {

    const result =
        calculateEstimatedHeatedVolume();

    buildingConfigurationState
        .estimatedHeatedVolumeM3 =
            result.estimatedHeatedVolumeM3 ??
            null;

    return {
        ...result,

        storedEstimatedHeatedVolumeM3:
            buildingConfigurationState
                .estimatedHeatedVolumeM3
    };
}