// [6.1.1]
// Imports centralized runtime energy state.
import { energyState }
from "../core/energyState.js";

// [6.1.2]
// Installs engineering system into runtime state.
export function installEngineeringSystem(
    zoneKey,
    system
) {

    // [6.1.3]
    // Prevents invalid runtime installations.
    if (
        !zoneKey ||
        !system
    ) {

        console.warn(
            "Invalid installation request."
        );

        return;
    }

    // [6.1.4]
    // Creates scalable runtime zone container.
    if (
        !energyState[zoneKey]
    ) {

        energyState[zoneKey] = {};
    }

    // [6.1.5]
    // Synchronizes installed state.
    energyState[zoneKey].installed =
        true;

    // [6.1.6]
    // Synchronizes installed system metadata.
    energyState[zoneKey].system =
        system.name;

    // [6.1.7]
    // Synchronizes engineering score contribution.
    energyState[zoneKey].score =
        system.score;

    // [6.1.8]
    // Outputs engineering diagnostics.
    console.log(
        "Installed System:",
        energyState
    );
}