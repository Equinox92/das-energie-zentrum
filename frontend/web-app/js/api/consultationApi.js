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

// =====================================================
// [12.7.4]
// Mock API response.
//
// Real ASP.NET endpoint will be connected
// during backend integration phase.
// =====================================================

// =====================================================
// [12.8.1]
// Mock API simulation.
// =====================================================

console.log(
    "Mock API Submission:",
    consultationData
);

// =====================================================
// [12.8.2]
// Simulates random API success.
// =====================================================

const successfulRequest =
    Math.random() > 0.2;

// =====================================================
// [12.8.3]
// Mock success response.
// =====================================================

if (
    successfulRequest
) {

    return {

        ok:
            true,

        status:
            200
    };
}

// =====================================================
// [12.8.4]
// Mock failure response.
// =====================================================

throw new Error(
    "Mock API failure."
);
}