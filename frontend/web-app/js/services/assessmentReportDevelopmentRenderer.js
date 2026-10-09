// =====================================================
// [19.39.2]
// ASSESSMENT REPORT DEVELOPMENT RENDERER
// =====================================================
//
// Provides a lightweight development renderer used to
// verify the report rendering abstraction.
//
// This is NOT the production PDF renderer.
//
// It produces a simple structured rendering result so
// the renderer boundary can be tested independently.
//
// This module does NOT:
// - generate PDF files
// - manipulate the DOM
// - modify application state
// - calculate energy scores
// - calculate heated volume
// =====================================================

import {
    createAssessmentReportRenderer
} from "./assessmentReportRenderer.js";

export const assessmentReportDevelopmentRenderer =
    createAssessmentReportRenderer(
        document => {

            return {

                rendered:
                    true,

                renderer:
                    "development",

                documentType:
                    document.documentType,

                documentVersion:
                    document.documentVersion,

                sectionCount:
                    document.sections.length,

                sectionIds:
                    document.sections.map(
                        section =>
                            section.sectionId
                    )
            };
        }
    );