// =====================================================
// [12.12.1]
// CONSULTATION RESPONSE MODEL
// =====================================================

// =====================================================
// [12.12.2]
// Creates standardized response object.
// =====================================================

export function createConsultationResponse(

    success,

    message,

    referenceId = null

) {

    return {

        success,

        message,

        referenceId
    };
}