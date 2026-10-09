// =====================================================
// [19.32.1]
// REPORT READINESS DATA
// =====================================================
//
// Defines standardized readiness states for the
// assessment reporting architecture.
//
// This file contains reporting-domain data only.
//
// It does NOT:
// - create reports
// - validate reports
// - calculate energy scores
// - calculate renovation scores
// - modify application state
// - manipulate the DOM
// - generate PDFs
// - persist data
//
// Its purpose is to provide a centralized vocabulary
// for report-consumer readiness states.
// =====================================================


// =====================================================
// [19.32.2]
// REPORT READINESS STATUSES
// =====================================================

export const reportReadinessStatuses = {

    ready: {

        code:
            "REPORT_READY",

        message:
            "Assessment report is ready for consumption."
    },


    payloadUnavailable: {

        code:
            "REPORT_PAYLOAD_UNAVAILABLE",

        message:
            "Assessment report payload is unavailable."
    },


    payloadInvalid: {

        code:
            "REPORT_PAYLOAD_INVALID",

        message:
            "Assessment report payload failed validation."
    }
};