// =====================================================
// [19.36.1]
// ASSESSMENT REPORT CONTRACT DATA
// =====================================================
//
// Defines the public contract exposed to future
// assessment-report consumers.
//
// This is a documentation-oriented domain definition.
//
// It does NOT:
// - generate reports
// - calculate scores
// - validate payloads
// - modify application state
// - generate PDFs
// - manipulate the DOM
// - persist data
//
// The purpose is to establish a stable boundary between
// the reporting pipeline and future consumers.
// =====================================================

export const assessmentReportContract = {

    reportType:
        "energy-assessment",

    reportVersion:
        "1.0.0",

    requiredRootSections: [

        "reportType",
        "reportVersion",
        "metadata",
        "assessment",
        "heatedEnvelope"
    ],

    requiredMetadataSections: [

        "snapshotId",
        "snapshotVersion",
        "reportingArchitectureVersion",
        "createdAt",
        "estimationStatus",
        "estimationDisclaimer"
    ],

    requiredAssessmentSections: [

        "inputs",
        "buildingContext",
        "metrics"
    ],

    requiredHeatedEnvelopeSections: [

        "reportSection",
        "geometry",
        "thermalBoundary",
        "dimensions",
        "estimatedHeatedVolumeM3",
        "estimationStatus",
        "methodology",
        "professionalCalculationRequired"
    ],

    excludedAssessmentConcepts: [

        "interactiveScore",
        "renovationScore"
    ]
};