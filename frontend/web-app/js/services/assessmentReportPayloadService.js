// =====================================================
// [19.29.1]
// ASSESSMENT REPORT PAYLOAD SERVICE
// =====================================================
//
// Creates the stable reporting payload consumed by
// future reporting systems.
//
// Architectural position:
//
// Assessment State
//        ↓
// Snapshot
//        ↓
// Validator
//        ↓
// Report Preparation
//        ↓
// REPORT PAYLOAD
//        ↓
// ┌───────────────┬──────────────┬──────────────┐
// │ PDF           │ API          │ Consultation  │
// └───────────────┴──────────────┴──────────────┘
//
// This service does NOT:
// - calculate energy scores
// - calculate renovation scores
// - modify dashboard state
// - modify building configuration
// - generate PDFs
// - persist data
// - manipulate the DOM
// - perform GEG calculations
// - perform DIN V 18599 calculations
//
// Its responsibility is to expose a stable reporting
// contract to future consumers.
// =====================================================


// =====================================================
// [19.29.2]
// REPORT PREPARATION IMPORT
// =====================================================

import {
    prepareAssessmentReport
} from "./assessmentReportPreparationService.js";


// =====================================================
// [19.29.3]
// BUILD ASSESSMENT REPORT PAYLOAD
// =====================================================
//
// Creates a consumer-facing reporting structure.
//
// Internal preparation/validation details remain inside
// the reporting architecture.
// =====================================================

export function buildAssessmentReportPayload() {

    const preparation =
        prepareAssessmentReport();


    // =================================================
    // [19.29.4]
    // REPORT NOT READY
    // =================================================

    if (
        !preparation.ready
    ) {

        return {

            ready: false,

            status:
                preparation.status,

            payload:
                null,

            validation:
                preparation.validation
        };
    }


    // =================================================
    // [19.29.5]
    // SOURCE SNAPSHOT
    // =================================================

    const snapshot =
        preparation.snapshot;


    // =================================================
    // [19.29.6]
    // REPORT PAYLOAD
    // =================================================

    const payload = {

        reportType:
            snapshot.reportType ??
            "energy-assessment",

        reportVersion:
            "1.0.0",

        metadata: {

            snapshotId:
                snapshot.metadata
                    ?.snapshotId ??
                null,

            snapshotVersion:
                snapshot.metadata
                    ?.snapshotVersion ??
                null,

            reportingArchitectureVersion:
                snapshot.metadata
                    ?.reportingArchitectureVersion ??
                null,

            createdAt:
                snapshot.metadata
                    ?.createdAt ??
                null,

            estimationStatus:
                snapshot.metadata
                    ?.estimationStatus ??
                "unresolved",

            estimationDisclaimer:
                snapshot.metadata
                    ?.estimationDisclaimer ??
                null
        },


        // =================================================
        // [19.29.7]
        // ASSESSMENT REPORT DATA
        // =================================================

        assessment: {

            inputs:
                snapshot.assessment
                    ?.inputs ??
                null,

            buildingContext:
                snapshot.assessment
                    ?.buildingContext ??
                null,

            metrics:
                snapshot.assessment
                    ?.metrics ??
                null
        },


        // =================================================
        // [19.29.8]
        // HEATED ENVELOPE REPORT DATA
        // =================================================

        heatedEnvelope:
            snapshot.heatedEnvelope ??
            null
    };


    // =================================================
    // [19.29.9]
    // RETURN REPORT PAYLOAD
    // =================================================

    return {

        ready: true,

        status:
            "ready",

        payload
    };
}