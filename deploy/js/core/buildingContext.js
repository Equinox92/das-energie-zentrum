// [16.10.1]
// Defines the centralized building context layer.
//
// This module provides a clean boundary between
// calculator input state and downstream building systems.
//
// The context represents the identity of the building
// currently being assessed.


// =====================================================
// [16.10.2]
// IMPORT CENTRALIZED CALCULATOR STATE
// =====================================================

import {
    energyCalculatorState
} from "./energyCalculatorState.js";


// =====================================================
// [16.10.3]
// BUILDING CONTEXT FACTORY
// =====================================================

/**
 * Creates the current building context.
 *
 * This function reads the selected building type
 * from the centralized calculator state and exposes
 * it through a dedicated application-level context.
 *
 * Responsibilities:
 *
 * - Read building identity from calculator state
 * - Provide a stable building context
 *
 * This module does NOT:
 *
 * - manipulate the DOM
 * - calculate energy scores
 * - render the building
 * - modify dashboard state
 * - modify calculator state
 *
 * @returns {Object} Current building context.
 */
export function getBuildingContext() {

    // =================================================
    // [16.10.4]
    // Retrieve the selected building type.
    // =================================================

    const houseType =
        energyCalculatorState.houseType;


    // =================================================
    // [16.10.5]
    // Return the centralized building context.
    // =================================================

    return {

        houseType

    };

}