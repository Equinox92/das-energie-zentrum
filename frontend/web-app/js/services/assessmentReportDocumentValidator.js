// =====================================================
// [19.38.1]
// ASSESSMENT REPORT DOCUMENT VALIDATOR
// =====================================================
//
// Validates the document-oriented assessment report
// structure before it reaches future renderers.
//
// Architectural position:
//
// Report Payload
//        ↓
// Report Document Model
//        ↓
// DOCUMENT VALIDATOR
//        ↓
// Future PDF / API / Document Renderer
//
// This service does NOT:
// - generate PDFs
// - modify report data
// - calculate scores
// - calculate heated volume
// - modify application state
// - manipulate the DOM
// - persist documents
//
// Its responsibility is structural validation only.
// =====================================================

const requiredDocumentFields = [

    "documentType",
    "documentVersion",
    "readiness",
    "metadata",
    "sections"
];

// =====================================================
// [19.38.2]
// VALIDATE DOCUMENT ROOT
// =====================================================

function validateDocumentRoot(
    document
) {

    const errors = [];

    if (
        !document ||
        typeof document !== "object"
    ) {

        return [
            "Report document is missing."
        ];
    }

    requiredDocumentFields
        .forEach(
            field => {

                if (
                    document[field] ===
                    undefined ||
                    document[field] ===
                    null
                ) {

                    errors.push(
                        `Missing report document field: ${field}`
                    );
                }
            }
        );

    return errors;
}

// =====================================================
// [19.38.3]
// VALIDATE DOCUMENT METADATA
// =====================================================

function validateDocumentMetadata(
    metadata
) {

    const errors = [];

    if (
        !metadata ||
        typeof metadata !== "object"
    ) {

        return [
            "Report document metadata is missing."
        ];
    }

    const requiredFields = [

        "documentType",
        "documentVersion",
        "snapshotId",
        "createdAt",
        "estimationStatus",
        "estimationDisclaimer"
    ];

    requiredFields
        .forEach(
            field => {

                if (
                    metadata[field] ===
                    undefined ||
                    metadata[field] ===
                    null ||
                    metadata[field] ===
                    ""
                ) {

                    errors.push(
                        `Missing report document metadata field: ${field}`
                    );
                }
            }
        );

    return errors;
}

// =====================================================
// [19.38.4]
// VALIDATE SECTIONS
// =====================================================

function validateSections(
    sections
) {

    const errors = [];

    if (
        !Array.isArray(sections)
    ) {

        return [
            "Report document sections are invalid."
        ];
    }

    if (
        sections.length === 0
    ) {

        errors.push(
            "Report document contains no sections."
        );

        return errors;
    }

    const requiredSectionIds = [

        "assessment",
        "heated-envelope"
    ];

    requiredSectionIds
        .forEach(
            sectionId => {

                const section =
                    sections.find(
                        item =>
                            item?.sectionId ===
                            sectionId
                    );

                if (!section) {

                    errors.push(
                        `Missing report document section: ${sectionId}`
                    );
                }
            }
        );

    sections.forEach(
        section => {

            if (
                !section ||
                typeof section !==
                    "object"
            ) {

                errors.push(
                    "Report document contains an invalid section."
                );

                return;
            }

            if (
                typeof section.sectionId !==
                    "string" ||
                section.sectionId.trim() ===
                    ""
            ) {

                errors.push(
                    "Report document section ID is invalid."
                );
            }

            if (
                typeof section.title !==
                    "string" ||
                section.title.trim() ===
                    ""
            ) {

                errors.push(
                    "Report document section title is invalid."
                );
            }
        }
    );

    return errors;
}

// =====================================================
// [19.38.5]
// PUBLIC VALIDATOR
// =====================================================

export function validateAssessmentReportDocument(
    document
) {

    const errors = [];

    errors.push(
        ...validateDocumentRoot(
            document
        )
    );

    if (
        !document ||
        typeof document !== "object"
    ) {

        return {

            valid:
                false,

            errors
        };
    }

    errors.push(
        ...validateDocumentMetadata(
            document.metadata
        )
    );

    errors.push(
        ...validateSections(
            document.sections
        )
    );

    return {

        valid:
            errors.length === 0,

        errors
    };
}