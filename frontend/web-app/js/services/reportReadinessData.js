// =====================================================
// [19.32.1]
// REPORT READINESS DATA
// =====================================================
//
// Defines the stable status vocabulary used by the
// assessment reporting consumer boundary.
//
// This file contains reporting status data only.
//
// It does NOT:
// - validate reports
// - create reports
// - modify application state
// - generate PDFs
// - persist data
// - manipulate the DOM
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