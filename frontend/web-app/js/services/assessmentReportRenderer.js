// =====================================================
// [19.39.1]
// ASSESSMENT REPORT RENDERER CONTRACT
// =====================================================
//
// Defines the application boundary for report rendering.
//
// Architectural position:
//
// Validated Report Document
//          ↓
// REPORT RENDERER
//          ↓
// ┌────────────────┬─────────────────┐
// │ PDF Renderer   │ HTML Renderer   │
// └────────────────┴─────────────────┘
//
// This module does NOT:
// - generate PDF files
// - manipulate application state
// - calculate energy scores
// - calculate heated volume
// - validate application state
// - persist documents
//
// Its responsibility is to define a stable rendering
// contract for future report-output implementations.
// =====================================================

export function createAssessmentReportRenderer(
    renderFunction
) {

    if (
        typeof renderFunction !==
        "function"
    ) {

        throw new TypeError(
            "Assessment report renderer requires a render function."
        );
    }

    return {

        render(
            document
        ) {

            if (
                !document ||
                typeof document !==
                    "object"
            ) {

                throw new TypeError(
                    "Assessment report renderer requires a valid document."
                );
            }

            return renderFunction(
                document
            );
        }
    };
}