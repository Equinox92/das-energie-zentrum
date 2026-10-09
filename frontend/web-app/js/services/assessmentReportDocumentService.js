// =====================================================
// [19.37.1]
// ASSESSMENT REPORT DOCUMENT SERVICE
// =====================================================
//
// Transforms the validated assessment-report payload
// into a document-oriented structure.
//
// Architectural position:
//
// Application State
//        ↓
// Report Snapshot
//        ↓
// Report Payload
//        ↓
// Report Consumer Contract
//        ↓
// REPORT DOCUMENT MODEL
//        ↓
// Future PDF / API / Consultation Document
//
// This service does NOT:
// - generate PDF files
// - calculate energy scores
// - calculate renovation scores
// - modify application state
// - manipulate the DOM
// - persist documents
// - perform GEG calculations
// - perform DIN V 18599 calculations
//
// Its responsibility is to organize validated reporting
// data into a stable human-readable document structure.
// =====================================================

import {
    getAssessmentReportForConsumer
} from "./assessmentReportConsumerService.js";

// =====================================================
// [19.37.2]
// BUILD DOCUMENT METADATA
// =====================================================

function buildDocumentMetadata(
    payload
) {

    return {

        documentType:
            payload?.reportType ??
            "energy-assessment",

        documentVersion:
            payload?.reportVersion ??
            "1.0.0",

        snapshotId:
            payload?.metadata
                ?.snapshotId ??
            null,

        createdAt:
            payload?.metadata
                ?.createdAt ??
            null,

        estimationStatus:
            payload?.metadata
                ?.estimationStatus ??
            "unresolved",

        estimationDisclaimer:
            payload?.metadata
                ?.estimationDisclaimer ??
            null
    };
}

// =====================================================
// [19.37.3]
// BUILD ASSESSMENT SECTION
// =====================================================

function buildAssessmentSection(
    assessment
) {

    return {

        sectionId:
            "assessment",

        title:
            "Energy Assessment",

        inputs:
            assessment?.inputs ??
            null,

        buildingContext:
            assessment?.buildingContext ??
            null,

        metrics:
            assessment?.metrics ??
            null
    };
}

// =====================================================
// [19.37.4]
// BUILD HEATED ENVELOPE SECTION
// =====================================================

function buildHeatedEnvelopeSection(
    heatedEnvelope
) {

    return {

        sectionId:
            "heated-envelope",

        title:
            "Heated Envelope",

        geometry:
            heatedEnvelope
                ?.geometry ??
            null,

        thermalBoundary:
            heatedEnvelope
                ?.thermalBoundary ??
            null,

        dimensions:
            heatedEnvelope
                ?.dimensions ??
            null,

        estimatedHeatedVolumeM3:
            heatedEnvelope
                ?.estimatedHeatedVolumeM3 ??
            null,

        estimationStatus:
            heatedEnvelope
                ?.estimationStatus ??
            "unresolved",

        methodology:
            heatedEnvelope
                ?.methodology ??
            null,

        professionalCalculationRequired:
            heatedEnvelope
                ?.professionalCalculationRequired ??
            true
    };
}

// =====================================================
// [19.37.5]
// BUILD REPORT DOCUMENT
// =====================================================

export function buildAssessmentReportDocument() {

    const consumerResult =
        getAssessmentReportForConsumer();

    if (
        !consumerResult ||
        consumerResult.ready !== true ||
        !consumerResult.payload
    ) {

        return {

            ready:
                false,

            status:
                consumerResult?.status ??
                "report-unavailable",

            document:
                null
        };
    }

    const payload =
        consumerResult.payload;

    const document = {

        documentType:
            "energy-assessment-report",

        documentVersion:
            "1.0.0",

        readiness:
            consumerResult.readiness,

        metadata:
            buildDocumentMetadata(
                payload
            ),

        sections: [

            buildAssessmentSection(
                payload.assessment
            ),

            buildHeatedEnvelopeSection(
                payload.heatedEnvelope
            )
        ]
    };

    return {

        ready:
            true,

        status:
            "ready",

        document
    };
}