// =====================================================
// [19.27.1]
// ASSESSMENT REPORT SNAPSHOT VALIDATOR
// =====================================================
//
// Validates the structural integrity of an assessment
// report snapshot before it is consumed by future
// reporting systems.
//
// Architectural position:
//
// Assessment State
//        ↓
// Assessment Snapshot
//        ↓
// Snapshot Validator
//        ↓
// PDF / API / Admin / Consultation Systems
//
// This service does NOT:
// - create snapshots
// - modify snapshots
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
// Its responsibility is limited to structural validation.
// =====================================================


// =====================================================
// [19.27.2]
// REQUIRED SNAPSHOT METADATA
// =====================================================
//
// Defines the metadata fields that must exist for a valid
// assessment report snapshot.
// =====================================================

const requiredMetadataFields = [

    "snapshotId",

    "snapshotVersion",

    "reportingArchitectureVersion",

    "createdAt",

    "reportingStatus",

    "estimationStatus",

    "estimationDisclaimer"
];


// =====================================================
// [19.27.3]
// VALIDATE SNAPSHOT METADATA
// =====================================================
//
// Checks whether all required metadata fields exist.
//
// This function does not validate the meaning of the
// values yet.
//
// It only validates structural presence.
// =====================================================

function validateSnapshotMetadata(
    metadata
) {

    const errors = [];

    if (
        !metadata ||
        typeof metadata !== "object"
    ) {

        errors.push(
            "Snapshot metadata is missing."
        );

        return errors;
    }

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
                    `Missing snapshot metadata field: ${field}`
                );
            }
        }
    );

    return errors;
}


// =====================================================
// [19.27.4]
// VALIDATE SNAPSHOT ID
// =====================================================
//
// Ensures that the snapshot contains a non-empty identity.
//
// UUID format validation is intentionally lightweight here.
// The purpose is to detect missing or malformed identity,
// not to enforce a persistence/database contract.
// =====================================================

function validateSnapshotId(
    snapshotId
) {

    if (
        typeof snapshotId !==
        "string" ||
        snapshotId.trim() === ""
    ) {

        return [
            "Snapshot ID is invalid."
        ];
    }

    return [];
}


// =====================================================
// [19.27.5]
// VALIDATE ASSESSMENT DATA
// =====================================================
//
// Determines whether a successful snapshot contains the
// expected assessment structure.
// =====================================================

function validateAssessmentData(
    snapshot
) {

    const errors = [];

    if (
        snapshot.success !== true
    ) {

        return errors;
    }

    if (
        !snapshot.assessment ||
        typeof snapshot.assessment !==
        "object"
    ) {

        errors.push(
            "Assessment data is missing."
        );

        return errors;
    }

    if (
        snapshot.assessment.inputs ===
        undefined
    ) {

        errors.push(
            "Assessment inputs are missing."
        );
    }

    if (
        snapshot.assessment.buildingContext ===
        undefined
    ) {

        errors.push(
            "Assessment building context is missing."
        );
    }

    if (
        snapshot.assessment.metrics ===
        undefined
    ) {

        errors.push(
            "Assessment metrics are missing."
        );
    }

    return errors;
}


// =====================================================
// [19.27.6]
// VALIDATE HEATED ENVELOPE DATA
// =====================================================
//
// Confirms that the heated-envelope reporting section
// exists.
//
// Detailed engineering validation remains the responsibility
// of the heated-envelope domain services.
// =====================================================

function validateHeatedEnvelopeData(
    snapshot
) {

    if (
        !snapshot.heatedEnvelope ||
        typeof snapshot.heatedEnvelope !==
        "object"
    ) {

        return [
            "Heated envelope report data is missing."
        ];
    }

    return [];
}


// =====================================================
// [19.27.7]
// VALIDATE ASSESSMENT REPORT SNAPSHOT
// =====================================================
//
// Performs the complete structural validation.
//
// Returns a validation result rather than throwing an
// exception.
//
// This allows future consumers to decide how they want
// to handle invalid reporting data.
// =====================================================

export function validateAssessmentReportSnapshot(
    snapshot
) {

    const errors = [];


    // =================================================
    // [19.27.8]
    // ROOT SNAPSHOT VALIDATION
    // =================================================

    if (
        !snapshot ||
        typeof snapshot !==
        "object"
    ) {

        return {

            valid: false,

            errors: [
                "Assessment report snapshot is missing."
            ]
        };
    }


    // =================================================
    // [19.27.9]
    // METADATA VALIDATION
    // =================================================

    errors.push(
        ...validateSnapshotMetadata(
            snapshot.metadata
        )
    );


    // =================================================
    // [19.27.10]
    // SNAPSHOT ID VALIDATION
    // =================================================

    errors.push(
        ...validateSnapshotId(
            snapshot.metadata?.snapshotId
        )
    );


    // =================================================
    // [19.27.11]
    // ASSESSMENT VALIDATION
    // =================================================

    errors.push(
        ...validateAssessmentData(
            snapshot
        )
    );


    // =================================================
    // [19.27.12]
    // HEATED ENVELOPE VALIDATION
    // =================================================

    errors.push(
        ...validateHeatedEnvelopeData(
            snapshot
        )
    );


    // =================================================
    // [19.27.13]
    // FINAL VALIDATION RESULT
    // =================================================

    return {

        valid:
            errors.length === 0,

        errors
    };
}