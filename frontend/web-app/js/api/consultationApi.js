// =====================================================
// [12.6.6]
// CONSULTATION API
// =====================================================

import {

    CONSULTATION_ENDPOINT

}
from "./endpoints.js";

import {

    post

}
from "./apiClient.js";

// =====================================================
// [12.6.7]
// Sends consultation request.
// =====================================================

export async function submitConsultation(

    consultationData

) {

    return await post(

        CONSULTATION_ENDPOINT,

        consultationData
    );
}