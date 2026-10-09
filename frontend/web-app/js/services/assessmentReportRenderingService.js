// =====================================================
// [19.40.1]
// ASSESSMENT REPORT RENDERING SERVICE
// =====================================================
//
// Coordinates:
//
// Report Document
//        ↓
// Renderer
//        ↓
// Rendered Output
//
// This service does NOT:
// - calculate assessment scores
// - calculate heated volume
// - validate application state
// - generate PDF files directly
// - manipulate the DOM
// - persist reports
//
// Its responsibility is orchestration only.
// =====================================================

import {
    buildAssessmentReportDocument
} from "./assessmentReportDocumentService.js";

export function renderAssessmentReport(
    renderer
) {

    // [19.40.2]
    // Renderer must be supplied by the caller.
    if (
        !renderer ||
        typeof renderer.render !==
            "function"
    ) {

        return {

            ready:
                false,

            status:
                "renderer-unavailable",

            output:
                null
        };
    }

    // [19.40.3]
    // Build the validated report document.
    const documentResult =
        buildAssessmentReportDocument();

    // [19.40.4]
    // Stop immediately if the document
    // cannot be prepared safely.
    if (
        !documentResult ||
        documentResult.ready !==
            true ||
        !documentResult.document
    ) {

        return {

            ready:
                false,

            status:
                "document-unavailable",

            output:
                null
        };
    }

    // [19.40.5]
    // Render only the validated document.
    const output =
        renderer.render(
            documentResult.document
        );

    // [19.40.6]
    // Return a stable consumer-facing result.
    return {

        ready:
            true,

        status:
            "rendered",

        output
    };
}