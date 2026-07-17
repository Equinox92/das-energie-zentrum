// =====================================================
// [6.3.1]
// ENTERPRISE RELATIONSHIP ENGINE
// =====================================================

// [6.3.2]
// Imports centralized runtime engineering state.
import {
    energyState
}
from "./energyState.js";

// =====================================================
// RUNTIME SYSTEM COLLECTOR
// =====================================================

// [6.3.3]
// Collects all installed engineering systems safely.
export function collectInstalledSystems() {

    // [6.3.4]
    // Initializes scalable runtime collection.
    const installedSystems = [];

    // =====================================================
    // DYNAMIC ZONE TRAVERSAL
    // =====================================================

    // [6.3.5]
    // Traverses all engineering zones safely.
    Object.entries(
        energyState
    ).forEach(([zoneKey, zoneState]) => {

        // [6.3.6]
        // Prevents invalid runtime traversal.
        if (
            !zoneState ||
            !zoneState.installedSystems
        ) {

            return;
        }

        // =====================================================
        // SYSTEM EXTRACTION
        // =====================================================

        // [6.3.7]
        // Traverses installed systems safely.
        zoneState.installedSystems.forEach(
            system => {

                // [6.3.8]
                // Pushes normalized engineering system.
                installedSystems.push({

                    zone:
                        zoneKey,

                    id:
                        system.id,

                    name:
                        system.name,

                    category:
                        system.category,

                    score:
                        system.score,

                    energyClass:
                        system.energyClass,

                    thermalImpact:
                        system.thermalImpact,

                    carbonReduction:
                        system.carbonReduction
                });
            }
        );
    });

    // [6.3.9]
    // Outputs scalable collector diagnostics.
    console.log(
        "Collected Systems:",
        installedSystems
    );

    // [6.3.10]
    // Returns normalized engineering systems.
    return installedSystems;
}