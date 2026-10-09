// =====================================================
// [19.30.1]
// ASSESSMENT REPORT PAYLOAD VALIDATOR
// =====================================================
//
// Validates the stable reporting payload before it is
// consumed by future external reporting systems.
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
// PAYLOAD VALIDATOR
//        ↓
// PDF / API / Consultation / Admin
//
// This service does NOT:
// - create report payloads
// - modify report payloads
// - calculate energy scores
// - calculate renovation scores
// - modify dashboard state
// - modify building configuration
// - generate PDFs
// - persist data
// - manipulate the DOM
// - perform GEG calculations
// - perform DIN V 18599 calculations
//
// Its responsibility is structural validation of the
// reporting consumer contract.
// =====================================================


// =====================================================
// [19.30.2]
// REQUIRED REPORT PAYLOAD FIELDS
// =====================================================

const requiredPayloadFields = [

    "reportType",

    "reportVersion",

    "metadata",

    "assessment",

    "heatedEnvelope"
];


// =====================================================
// [19.30.3]
// VALIDATE REPORT PAYLOAD ROOT
// =====================================================

function validatePayloadRoot(
    payload
) {

    const errors = [];

    if (
        !payload ||
        typeof payload !==
        "object"
    ) {

        errors.push(
            "Report payload is missing."
        );

        return errors;
    }

    requiredPayloadFields.forEach(
        field => {

            if (
                payload[field] ===
                undefined ||
                payload[field] ===
                null
            ) {

                errors.push(
                    `Missing report payload field: ${field}`
                );
            }
        }
    );

    return errors;
}


// =====================================================
// [19.30.4]
// VALIDATE REPORT TYPE
// =====================================================

function validateReportType(
    reportType
) {

    if (
        reportType !==
        "energy-assessment"
    ) {

        return [
            "Report type is invalid."
        ];
    }

    return [];
}


// =====================================================
// [19.30.5]
// VALIDATE REPORT VERSION
// =====================================================

function validateReportVersion(
    reportVersion
) {

    if (
        typeof reportVersion !==
        "string" ||
        reportVersion.trim() === ""
    ) {

        return [
            "Report version is invalid."
        ];
    }

    return [];
}


// =====================================================
// [19.30.6]
// VALIDATE REPORT METADATA
// =====================================================

function validateReportMetadata(
    metadata
) {

    const errors = [];

    if (
        !metadata ||
        typeof metadata !==
        "object"
    ) {

        return [
            "Report metadata is missing."
        ];
    }


    const requiredMetadataFields = [

        "snapshotId",

        "snapshotVersion",

        "reportingArchitectureVersion",

        "createdAt",

        "estimationStatus",

        "estimationDisclaimer"
    ];


    requiredMetadataFields.forEach(
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
                    `Missing report metadata field: ${field}`
                );
            }
        }
    );

    return errors;
}


// =====================================================
// [19.30.7]
// VALIDATE ASSESSMENT SECTION
// =====================================================

function validateAssessmentSection(
    assessment
) {

    const errors = [];

    if (
        !assessment ||
        typeof assessment !==
        "object"
    ) {

        return [
            "Assessment section is missing."
        ];
    }


    if (
        assessment.inputs ===
        undefined
    ) {

        errors.push(
            "Assessment inputs are missing."
        );
    }


    if (
        assessment.buildingContext ===
        undefined
    ) {

        errors.push(
            "Assessment building context is missing."
        );
    }


    if (
        assessment.metrics ===
        undefined
    ) {

        errors.push(
            "Assessment metrics are missing."
        );
    }

    return errors;
}


// =====================================================
// [19.30.8]
// VALIDATE HEATED ENVELOPE SECTION
// =====================================================

function validateHeatedEnvelopeSection(
    heatedEnvelope
) {

    if (
        !heatedEnvelope ||
        typeof heatedEnvelope !==
        "object"
    ) {

        return [
            "Heated envelope section is missing."
        ];
    }

    return [];
}


// =====================================================
// [19.30.9]
// VALIDATE ASSESSMENT REPORT PAYLOAD
// =====================================================
//
// Returns a validation result instead of throwing.
//
// This allows future reporting consumers to decide how
// invalid payloads should be handled.
// =====================================================

export function validateAssessmentReportPayload(
    payload
) {

    const errors = [];


    // =================================================
    // [19.30.10]
    // ROOT VALIDATION
    // =================================================

    errors.push(
        ...validatePayloadRoot(
            payload
        )
    );


    if (
        !payload ||
        typeof payload !==
        "object"
    ) {

        return {

            valid: false,

            errors
        };
    }


    // =================================================
    // [19.30.11]
    // REPORT TYPE VALIDATION
    // =================================================

    errors.push(
        ...validateReportType(
            payload.reportType
        )
    );


    // =================================================
    // [19.30.12]
    // REPORT VERSION VALIDATION
    // =================================================

    errors.push(
        ...validateReportVersion(
            payload.reportVersion
        )
    );


    // =================================================
    // [19.30.13]
    // METADATA VALIDATION
    // =================================================

    errors.push(
        ...validateReportMetadata(
            payload.metadata
        )
    );


    // =================================================
    // [19.30.14]
    // ASSESSMENT VALIDATION
    // =================================================

    errors.push(
        ...validateAssessmentSection(
            payload.assessment
        )
    );


    // =================================================
    // [19.30.15]
    // HEATED ENVELOPE VALIDATION
    // =================================================

    errors.push(
        ...validateHeatedEnvelopeSection(
            payload.heatedEnvelope
        )
    );


    // =================================================
    // [19.30.16]
    // FINAL VALIDATION RESULT
    // =================================================

    return {

        valid:
            errors.length === 0,

        errors
    };
}