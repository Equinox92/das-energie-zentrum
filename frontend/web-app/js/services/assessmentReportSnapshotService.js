// =====================================================
// [19.25.1]
// ASSESSMENT REPORT SNAPSHOT SERVICE
// =====================================================
//
// Creates a structured snapshot of the current assessment
// for future reporting systems.
//
// The snapshot combines:
//
// AS-IS Energy Assessment
//          +
// Heated Envelope Report
//
// This creates a stable reporting boundary between the
// application's engineering state and future output systems.
//
// Future consumers may include:
//
// - PDF generation
// - API responses
// - Administrative reporting
// - Consultation records
// - Customer documentation
//
// This service does NOT:
// - calculate energy scores
// - calculate renovation scores
// - modify assessment state
// - modify dashboard state
// - modify building configuration
// - generate PDFs
// - write files
// - manipulate the DOM
// - perform GEG calculations
// - perform DIN V 18599 calculations
// =====================================================


// =====================================================
// [19.25.2]
// ASSESSMENT SNAPSHOT VERSION
// =====================================================
//
// Provides an explicit version for the structure of the
// reporting snapshot.
//
// This is NOT the application version.
//
// It identifies the structure/schema of the generated
// assessment snapshot.
//
// Future reporting systems can use this value when the
// snapshot structure evolves.
// =====================================================

const ASSESSMENT_SNAPSHOT_VERSION =
    "1.0.0";


// =====================================================
// [19.25.3]
// REPORTING ARCHITECTURE VERSION
// =====================================================
//
// Identifies the reporting architecture used to construct
// the snapshot.
//
// This is intentionally separate from the snapshot version.
//
// Snapshot version:
//     Structure of the returned object.
//
// Architecture version:
//     Reporting architecture that produced the object.
// =====================================================

const REPORTING_ARCHITECTURE_VERSION =
    "19.x";


// =====================================================
// [19.25.4]
// SNAPSHOT CREATION TIMESTAMP
// =====================================================
//
// Creates an ISO-8601 timestamp when the snapshot is
// constructed.
//
// The timestamp represents snapshot creation time.
//
// It does NOT represent:
// - building construction date
// - assessment date supplied by the user
// - consultation appointment date
// - PDF generation date
// =====================================================

function createSnapshotTimestamp() {

    return new Date()
        .toISOString();
}


// =====================================================
// [19.26.1]
// SNAPSHOT ID GENERATOR
// =====================================================
//
// Generates a unique identifier for the individual
// assessment report snapshot.
//
// The identifier is intentionally created at snapshot
// construction time.
//
// It is NOT:
// - stored in application state
// - stored in a database
// - used as a customer ID
// - used as a consultation ID
// - used as an authentication identifier
//
// Future persistence layers may use this value to identify
// an individual report snapshot.
// =====================================================

function createSnapshotId() {

    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {

        return crypto.randomUUID();
    }

    return [
        Date.now()
            .toString(36),

        Math.random()
            .toString(36)
            .substring(2, 10)
    ].join("-");
}


// =====================================================
// [19.25.5]
// ESTIMATION STATUS RESOLVER
// =====================================================
//
// Determines the reporting status of the heated-envelope
// estimation.
//
// This keeps reporting metadata separate from the actual
// engineering calculation.
// =====================================================

function resolveEstimationStatus(
    heatedEnvelope
) {

    if (
        !heatedEnvelope
    ) {

        return "unresolved";
    }

    return (
        heatedEnvelope
            .estimationStatus ??
        "unresolved"
    );
}


// =====================================================
// [19.25.6]
// ESTIMATION DISCLAIMER
// =====================================================
//
// Provides a stable reporting disclaimer for approximate
// heated-volume values.
//
// This wording intentionally avoids presenting the
// approximation as a statutory or professional calculation.
// =====================================================

const ESTIMATION_DISCLAIMER =
    "Heated volume is an approximate engineering estimate based on the available assessment information. It is not a measured building volume or a statutory GEG/DIN V 18599 calculation.";


// =====================================================
// [19.25.7]
// BUILD ASSESSMENT REPORT SNAPSHOT
// =====================================================
//
// Creates the complete reporting snapshot.
//
// The function remains read-only with respect to application
// state.
//
// It reads:
//
// energyAssessmentState
// heated-envelope reporting service
//
// It returns a new reporting object.
// =====================================================

import {
    energyAssessmentState
} from "../core/energyAssessmentState.js";

import {
    buildHeatedEnvelopeReportData
} from "./heatedEnvelopeReportService.js";

export function buildAssessmentReportSnapshot() {

    const assessment =
        energyAssessmentState.assessment;

    const heatedEnvelope =
        buildHeatedEnvelopeReportData();

    const estimationStatus =
        resolveEstimationStatus(
            heatedEnvelope
        );


    // =====================================================
    // [19.26.2]
    // SNAPSHOT METADATA
    // =====================================================
    //
    // Creates the metadata belonging to this individual
    // snapshot.
    //
    // snapshotId:
    //     Identifies this specific snapshot.
    //
    // snapshotVersion:
    //     Identifies the structure of the snapshot.
    //
    // reportingArchitectureVersion:
    //     Identifies the reporting architecture.
    //
    // createdAt:
    //     Identifies when this snapshot was created.
    // =====================================================

    const snapshotMetadata = {

        snapshotId:
            createSnapshotId(),

        snapshotVersion:
            ASSESSMENT_SNAPSHOT_VERSION,

        reportingArchitectureVersion:
            REPORTING_ARCHITECTURE_VERSION,

        createdAt:
            createSnapshotTimestamp(),

        reportingStatus:
            assessment &&
            assessment.success
                ? "ready"
                : "assessment-unavailable",

        estimationStatus,

        estimationDisclaimer:
            ESTIMATION_DISCLAIMER
    };


    // =====================================================
    // [19.25.8]
    // UNAVAILABLE ASSESSMENT SNAPSHOT
    // =====================================================
    //
    // The snapshot remains structurally valid even when
    // no successful assessment exists.
    //
    // This allows future reporting systems to distinguish
    // between:
    //
    // - a valid snapshot
    // - an unavailable assessment
    // =====================================================

    if (
        !assessment ||
        !assessment.success
    ) {

        return {

            success: false,

            status:
                "assessment-unavailable",

            metadata:
                snapshotMetadata,

            assessment:
                null,

            heatedEnvelope
        };
    }


    // =====================================================
    // [19.25.9]
    // READY ASSESSMENT SNAPSHOT
    // =====================================================
    //
    // Returns the successful assessment together with
    // stable reporting metadata.
    // =====================================================

    return {

        success: true,

        status:
            "ready",

        reportType:
            "energy-assessment",

        metadata:
            snapshotMetadata,

        assessment: {

            inputs:
                assessment.inputs ??
                null,

            buildingContext:
                assessment.buildingContext ??
                null,

            metrics:
                assessment.metrics ??
                null
        },

        heatedEnvelope
    };
}