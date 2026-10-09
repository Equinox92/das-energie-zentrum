// [16.9.3]
// Imports centralized calculator assessment state.
import {
    energyAssessmentState
} from "../core/energyAssessmentState.js";


// =====================================================
// [16.9.4]
// ENERGY ASSESSMENT STATE SERVICE
// =====================================================

/**
 * Stores the latest calculator assessment.
 *
 * This service acts as the controlled bridge between
 * calculator intelligence and dashboard intelligence.
 */
export function storeEnergyAssessment(
    assessment
) {

    // [16.9.5]
    // Rejects invalid assessment objects.
    if (
        !assessment ||
        !assessment.success
    ) {

        console.warn(
            "[16.9] Invalid energy assessment received."
        );

        return false;
    }

// =====================================================
// [17.8.1]
// BUILDING CONTEXT VERIFICATION
// =====================================================
//
// Confirms that the assessment contains the building
// context produced by the assessment engine.
//
// The service does not resolve or modify the context.
// It only verifies that contextual assessment data has
// successfully reached the state boundary.
// =====================================================

if (
    !assessment.buildingContext
) {

    console.warn(
        "[17.8] Assessment received without building context."
    );

}
    // [16.9.6]
    // Stores the validated assessment centrally.
    energyAssessmentState.assessment =
        assessment;


    // [16.9.7]
    // Confirms successful synchronization.
    console.log(
        "[16.9] Energy assessment stored:",
        assessment
    );


    return true;

}