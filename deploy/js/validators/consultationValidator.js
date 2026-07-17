// =====================================================
// [12.2.1]
// CONSULTATION FORM VALIDATOR
// =====================================================

// =====================================================
// [12.2.2]
// Validates consultation request data.
// =====================================================

export function validateConsultationForm(
    consultationData
) {

    // =====================================================
    // [12.2.3]
    // Stores validation errors.
    // =====================================================

    const errors = {};

    // =====================================================
    // [12.2.4]
    // Validates full name.
    // =====================================================

    if (
        !consultationData.fullName
    ) {

        errors.fullName =
            "Full name is required.";
    }

    // =====================================================
    // [12.2.5]
    // Validates email.
    // =====================================================

    if (
        !consultationData.email
    ) {

        errors.email =
            "Email address is required.";
    }

    // =====================================================
    // [12.2.6]
    // Validates email format.
    // =====================================================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        consultationData.email &&
        !emailPattern.test(
            consultationData.email
        )
    ) {

        errors.email =
            "Please enter a valid email address.";
    }

    // =====================================================
    // [12.2.7]
    // Validates project type.
    // =====================================================

    if (
        !consultationData.projectType
    ) {

        errors.projectType =
            "Project type is required.";
    }

    // =====================================================
    // [12.2.8]
    // Validates message.
    // =====================================================

    if (
        !consultationData.message
    ) {

        errors.message =
            "Message is required.";
    }

    // =====================================================
    // [12.2.9]
    // Validates minimum message length.
    // =====================================================

    if (
        consultationData.message &&
        consultationData.message.length < 20
    ) {

        errors.message =
            "Message must contain at least 20 characters.";
    }

    // =====================================================
    // [12.2.10]
    // Returns validation result.
    // =====================================================

    return {

        isValid:
            Object.keys(
                errors
            ).length === 0,

        errors
    };
}