// =====================================================
// [19.31.1]
// ASSESSMENT REPORT SERVICE
// =====================================================
//
// Provides the authoritative entry point for future
// assessment-report consumers.
//
// Architectural position:
//
// Assessment State
//        ↓
// Snapshot
//        ↓
// Snapshot Validator
//        ↓
// Report Preparation
//        ↓
// Report Payload
//        ↓
// Payload Validator
//        ↓
// ASSESSMENT REPORT SERVICE
//        ↓
// ┌───────────────┬──────────────┬─────────────────┐
// │ PDF           │ API          │ Consultation    │
// └───────────────┴──────────────┴─────────────────┘
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
// Its responsibility is to provide one stable consumer
// gateway for validated assessment reporting data.
// =====================================================


// =====================================================
// [19.31.2]
// REPORT PAYLOAD IMPORT
// =====================================================

import {
    buildAssessmentReportPayload
} from "./assessmentReportPayloadService.js";


// =====================================================
// [19.31.3]
// REPORT PAYLOAD VALIDATOR IMPORT
// =====================================================

import {
    validateAssessmentReportPayload
} from "./assessmentReportPayloadValidator.js";


// =====================================================
// [19.32.1]
// REPORT READINESS STATUS IMPORT
// =====================================================
//
// Provides standardized readiness codes and messages.
//
// This keeps consumer-facing readiness terminology
// centralized rather than duplicating strings throughout
// the reporting service.
// =====================================================

import {
    reportReadinessStatuses
} from "../data/reportReadinessData.js";


// =====================================================
// [19.32.2]
// PREPARE ASSESSMENT REPORT FOR CONSUMER
// =====================================================
//
// Converts internal reporting results into a stable
// consumer-facing readiness contract.
//
// Consumers should use this function instead of directly
// coordinating the payload builder and validator.
// =====================================================

export function prepareAssessmentReportForConsumer() {

    const reportResult =
        buildAssessmentReportPayload();


    // =================================================
    // [19.32.3]
    // PAYLOAD CREATION FAILURE
    // =================================================
    //
    // The report payload could not be created.
    //
    // The consumer receives a standardized readiness
    // response rather than internal validation details.
// =================================================

    if (
        !reportResult ||
        reportResult.ready !== true ||
        !reportResult.payload
    ) {

        const readiness =
            reportReadinessStatuses
                .payloadUnavailable;

        return {

            ready: false,

            status:
                "report-payload-unavailable",

            payload:
                null,

            readiness: {

                ready: false,

                code:
                    readiness.code,

                message:
                    readiness.message
            }
        };
    }


    // =================================================
    // [19.32.4]
    // VALIDATE CONSUMER PAYLOAD
    // =================================================
    //
    // The payload is independently validated before
    // being exposed to external reporting consumers.
// =================================================

    const validation =
        validateAssessmentReportPayload(
            reportResult.payload
        );


    // =================================================
    // [19.32.5]
    // INVALID CONSUMER PAYLOAD
    // =================================================
    //
    // Internal validation details remain inside the
    // reporting architecture.
    //
    // External consumers receive only the standardized
    // readiness contract.
// =================================================

    if (
        !validation.valid
    ) {

        const readiness =
            reportReadinessStatuses
                .payloadInvalid;

        return {

            ready: false,

            status:
                "report-payload-invalid",

            payload:
                null,

            readiness: {

                ready: false,

                code:
                    readiness.code,

                message:
                    readiness.message
            }
        };
    }


    // =================================================
    // [19.32.6]
    // CONSUMER-READY REPORT
    // =================================================
    //
    // The payload passed validation and is now safe for
    // future reporting consumers.
// =================================================

    const readiness =
        reportReadinessStatuses
            .ready;

    return {

        ready: true,

        status:
            "ready",

        payload:
            reportResult.payload,

        readiness: {

            ready: true,

            code:
                readiness.code,

            message:
                readiness.message
        }
    };
}