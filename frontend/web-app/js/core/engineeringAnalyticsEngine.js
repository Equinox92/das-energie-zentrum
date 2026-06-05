// =====================================================
// [8.1.1]
// ENGINEERING ANALYTICS ENGINE
// =====================================================

// [8.1.2]
// Imports centralized runtime state.
import {
    energyState
}
from "./energyState.js";

// =====================================================
// TOTAL SAVINGS ENGINE
// =====================================================

// [8.1.3]
// Calculates total projected savings.
export function calculateEstimatedSavings() {

    // [8.1.4]
    // Initializes scalable savings accumulator.
    let savings = 0;

    // [8.1.5]
    // Traverses engineering zones safely.
    Object.values(
        energyState
    ).forEach(zone => {

        // [8.1.6]
        // Prevents invalid runtime access.
        if (
            !zone ||
            !zone.installedSystems
        ) {

            return;
        }

        // [8.1.7]
        // Aggregates engineering savings safely.
        zone.installedSystems.forEach(
            system => {

                savings +=
                    system.estimatedSavings || 0;
            }
        );
    });

    // [8.1.8]
    // Returns projected savings.
    return savings;
}

// =====================================================
// CARBON REDUCTION ENGINE
// =====================================================

// [8.1.9]
// Calculates environmental carbon reduction.
export function calculateCarbonReduction() {

    // [8.1.10]
    // Initializes scalable carbon accumulator.
    let carbonReduction = 0;

    // [8.1.11]
    // Traverses engineering zones safely.
    Object.values(
        energyState
    ).forEach(zone => {

        // [8.1.12]
        // Prevents invalid runtime access.
        if (
            !zone ||
            !zone.installedSystems
        ) {

            return;
        }

        // [8.1.13]
        // Aggregates environmental reductions.
        zone.installedSystems.forEach(
            system => {

                carbonReduction +=
                    system.carbonReduction || 0;
            }
        );
    });

    // [8.1.14]
    // Returns calculated reduction.
    return carbonReduction;
}

// =====================================================
// THERMAL IMPACT ENGINE
// =====================================================

// [8.1.15]
// Calculates total thermal optimization impact.
export function calculateThermalImpact() {

    // [8.1.16]
    // Initializes thermal accumulator.
    let thermalImpact = 0;

    // [8.1.17]
    // Traverses engineering zones safely.
    Object.values(
        energyState
    ).forEach(zone => {

        // [8.1.18]
        // Prevents invalid traversal.
        if (
            !zone ||
            !zone.installedSystems
        ) {

            return;
        }

        // [8.1.19]
        // Aggregates thermal impact safely.
        zone.installedSystems.forEach(
            system => {

                thermalImpact +=
                    system.thermalImpact || 0;
            }
        );
    });

    // [8.1.20]
    // Returns thermal optimization score.
    return thermalImpact;
}

// =====================================================
// THERMAL EFFICIENCY CLASSIFICATION
// =====================================================

// [8.1.21]
// Calculates interpreted thermal efficiency rating.
export function calculateThermalEfficiency() {

    // [8.1.22]
    // Retrieves aggregated thermal impact.
    const thermalImpact =
        calculateThermalImpact();

    // [8.1.23]
    // Handles poor thermal optimization.
    if (thermalImpact <= 20) {

        return "Low";
    }

    // [8.1.24]
    // Handles moderate thermal optimization.
    if (thermalImpact <= 50) {

        return "Moderate";
    }

    // [8.1.25]
    // Handles advanced thermal optimization.
    if (thermalImpact <= 80) {

        return "High";
    }

    // [8.1.26]
    // Handles enterprise-grade optimization.
    return "Excellent";
}

// =====================================================
// BUILDING OPTIMIZATION ENGINE
// =====================================================

// [8.1.27]
// Calculates building optimization classification.
export function calculateOptimizationLevel() {

    // [8.1.28]
    // Retrieves engineering analytics safely.
    const savings =
        calculateEstimatedSavings();

    const carbonReduction =
        calculateCarbonReduction();

    const thermalImpact =
        calculateThermalImpact();

    // [8.1.29]
    // Calculates combined optimization index.
    const optimizationIndex =

        savings +
        carbonReduction +
        thermalImpact;

    // [8.1.30]
    // Handles low optimization buildings.
    if (optimizationIndex <= 10000) {

        return "Basic";
    }

    // [8.1.31]
    // Handles improving buildings.
    if (optimizationIndex <= 25000) {

        return "Improving";
    }

    // [8.1.32]
    // Handles optimized buildings.
    if (optimizationIndex <= 50000) {

        return "Optimized";
    }

    // [8.1.33]
    // Handles enterprise-grade buildings.
    return "High Performance";
}
