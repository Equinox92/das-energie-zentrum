// =====================================================
// [19.33.1]
// ASSESSMENT REPORT CONSUMER SERVICE
// =====================================================
//
// Provides a stable application-level adapter for
// future assessment-report consumers.
//
// Architectural position:
//
// Assessment State
//        ↓
// Assessment Report Service
//        ↓
// Assessment Report Consumer Service
//        ↓
// ┌───────────────┬──────────────┬─────────────────┐
// │ PDF           │ API          │ Consultation    │
// └───────────────┴──────────────┴─────────────────┘
//
// This adapter prevents future consumers from directly
// depending on the internal reporting pipeline.
//
// This service does NOT:
// - generate PDFs
// - persist reports
// - calculate energy scores
// - calculate renovation scores
// - modify dashboard state
// - modify building configuration
// - manipulate the DOM
// - perform GEG calculations
// - perform DIN V 18599 calculations
//
// Its responsibility is to expose the validated,
// consumer-ready assessment report through one stable
// application service boundary.
// =====================================================


// =====================================================
// [19.33.2]
// ASSESSMENT REPORT SERVICE IMPORT
// =====================================================

import {
    prepareAssessmentReportForConsumer
} from "./assessmentReportService.js";


// =====================================================
// [19.33.3]
// CONSUMER REPORT PREPARATION
// =====================================================
//
// Provides the validated report contract to future
// consumers without exposing the internal preparation
// pipeline.
// =====================================================

export function getAssessmentReportForConsumer() {

    const reportResult =
        prepareAssessmentReportForConsumer();

    if (
        !reportResult ||
        reportResult.ready !== true
    ) {

        return {

            ready: false,

            status:
                reportResult?.status ??
                "report-unavailable",

            readiness:
                reportResult?.readiness ??
                null,

            payload:
                null
        };
    }

    return {

        ready: true,

        status:
            "ready",

        readiness:
            reportResult.readiness,

        payload:
            reportResult.payload
    };
}