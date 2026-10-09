// =====================================================
// [19.28.1]
// ASSESSMENT REPORT PREPARATION SERVICE
// =====================================================
//
// Coordinates assessment report snapshot creation
// and structural validation.
//
// Architectural position:
//
// Assessment State
//        ↓
// Assessment Snapshot Service
//        ↓
// Assessment Snapshot Validator
//        ↓
// Report Preparation Service
//        ↓
// Future Reporting Consumers
//
// Future consumers may include:
//
// - PDF generation
// - API responses
// - Consultation records
// - Administrative reporting
// - Customer documentation
//
// This service does NOT:
// - generate PDF files
// - write files
// - persist data
// - calculate energy scores
// - calculate renovation scores
// - modify dashboard state
// - modify building configuration
// - manipulate the DOM
// - perform GEG calculations
// - perform DIN V 18599 calculations
//
// Its responsibility is orchestration only.
// =====================================================


// =====================================================
// [19.28.2]
// SNAPSHOT SERVICE IMPORT
// =====================================================
//
// Provides the authoritative assessment snapshot.
// =====================================================

import {
    buildAssessmentReportSnapshot
} from "./assessmentReportSnapshotService.js";


// =====================================================
// [19.28.3]
// SNAPSHOT VALIDATOR IMPORT
// =====================================================
//
// Provides structural validation of the snapshot.
// =====================================================

import {
    validateAssessmentReportSnapshot
} from "./assessmentReportSnapshotValidator.js";


// =====================================================
// [19.28.4]
// PREPARE ASSESSMENT REPORT
// =====================================================
//
// Creates the snapshot and immediately validates it.
//
// This creates a single reporting preparation boundary
// for future reporting consumers.
// =====================================================

export function prepareAssessmentReport() {

    const snapshot =
        buildAssessmentReportSnapshot();


    // =================================================
    // [19.28.5]
    // VALIDATE GENERATED SNAPSHOT
    // =================================================
    //
    // The snapshot is validated immediately after creation.
    //
    // No consumer needs to repeat this process.
    // =================================================

    const validation =
        validateAssessmentReportSnapshot(
            snapshot
        );


    // =================================================
    // [19.28.6]
    // REPORT PREPARATION RESULT
    // =================================================

    if (
        !validation.valid
    ) {

        return {

            ready: false,

            status:
                "invalid-snapshot",

            snapshot,

            validation
        };
    }


    // =================================================
    // [19.28.7]
    // READY REPORT RESULT
    // =================================================

    return {

        ready: true,

        status:
            "ready",

        snapshot,

        validation
    };
}