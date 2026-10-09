// =====================================================
// [19.44.2B]
// ASSESSMENT REPORT UI CONTROLLER
// =====================================================
//
// Architectural responsibility:
//
// UI Button
//      ↓
// Report Controller
//      ↓
// Report Rendering Service
//      ↓
// PDF Renderer
//
// This controller does NOT:
// - calculate energy scores
// - build report documents
// - render PDF content
// - access jsPDF directly
//
// =====================================================

import {
    renderAssessmentReport
} from "../services/assessmentReportRenderingService.js";

import {
    createAssessmentReportPdfRenderer
} from "../services/assessmentReportPdfRenderer.js";


// [19.44.2B.1]
// Locate the report download button.
const downloadButton =
    document.getElementById(
        "downloadAssessmentReportButton"
    );


// [19.44.2B.2]
// Stop safely if the button does not exist
// on the current page.
if (!downloadButton) {

    console.warn(
        "[19.44.2B] Assessment report button not found."
    );

} else {

    // [19.44.2B.3]
    // Attach the user interaction.
    downloadButton.addEventListener(
        "click",
        () => {

            try {

                // [19.44.2B.4]
                // Create the technology-specific PDF renderer.
                const renderer =
                    createAssessmentReportPdfRenderer();


                // [19.44.2B.5]
                // Generate the PDF from the validated
                // assessment report document.
                const result =
                    renderAssessmentReport(
                        renderer
                    );


                // [19.44.2B.6]
                // Reject unsuccessful rendering.
                if (
                    !result ||
                    result.ready !== true ||
                    !result.output
                ) {

                    throw new Error(
                        result?.status ??
                        "Assessment report could not be generated."
                    );
                }


                // [19.44.2B.7]
                // Download the generated PDF.
                result.output.save(
                    "das-energie-zentrum-assessment-report.pdf"
                );


                // [19.44.2B.8]
                // Confirm successful generation.
                console.log(
                    "[19.44.2B] Assessment report downloaded."
                );

            } catch (error) {

                // [19.44.2B.9]
                // Keep PDF failures isolated from
                // the rest of the assessment application.
                console.error(
                    "[19.44.2B] Assessment report generation failed:",
                    error
                );

            }

        }
    );
}