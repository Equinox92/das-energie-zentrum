// =====================================================
// [19.44.1I]
// ASSESSMENT REPORT PDF ENGINE ADAPTER
// =====================================================
//
// Connects the application PDF renderer boundary to
// the browser-loaded jsPDF engine.
//
// jsPDF is intentionally loaded by assessment.php:
//
// <script src="assets/vendor/jspdf/jspdf.umd.min.js"></script>
//
// This application does NOT use:
// - npm package resolution
// - package.json
// - node_modules
// - webpack
// - Vite
// - another frontend bundler
//
// Architectural flow:
//
// Assessment Report Document
//          ↓
// PDF Renderer
//          ↓
// PDF Engine Adapter
//          ↓
// window.jspdf.jsPDF
//          ↓
// PDF output
//
// =====================================================

export function createAssessmentReportPdfEngineAdapter() {

    // [19.44.1I.1]
    // Verify that the browser-loaded jsPDF engine exists.
    if (
        !window.jspdf ||
        typeof window.jspdf.jsPDF !==
            "function"
    ) {

        throw new Error(
            "jsPDF browser engine is unavailable."
        );
    }

    // [19.44.1I.2]
    // Return the application's technology-neutral
    // PDF engine interface.
    return {

        // [19.44.1I.3]
        // Generate a PDF from a validated report document.
        generate(
            document
        ) {

            // [19.44.1I.4]
            // Reject missing or invalid report documents.
            if (
                !document ||
                typeof document !==
                    "object"
            ) {

                throw new TypeError(
                    "PDF engine requires a valid report document."
                );
            }

            // [19.44.1I.5]
            // Create a new jsPDF document.
            const pdf =
                new window.jspdf.jsPDF();

            // [19.44.1I.6]
            // Return the native PDF engine instance.
            //
            // PDF document composition will be added
            // in the renderer layer, not here.
            return pdf;
        }
    };
}