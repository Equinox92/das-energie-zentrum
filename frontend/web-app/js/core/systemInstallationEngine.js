// [6.8.1]
// Imports centralized runtime energy state.
import {
    energyState
} from "./energyState.js";

// =====================================================
// INSTALLATION ENGINE
// =====================================================

// [6.8.2]
// Installs selected engineering system safely.
export function installSystem(
    zoneKey,
    selectedSystem
) {

    // [6.8.3]
    // Validates incoming installation requests.
    if (
        !zoneKey ||
        !selectedSystem
    ) {

        console.warn(
            "Invalid installation request."
        );

        return;
    }

    // [6.8.4]
    // Ensures scalable zone container exists.
    if (
        !energyState[zoneKey]
    ) {

        energyState[zoneKey] = {

            installedSystems: []
        };
    }

    // [6.8.5]
    // Ensures installed systems array exists safely.
    if (
        !energyState[zoneKey]
            .installedSystems
    ) {

        energyState[zoneKey]
            .installedSystems = [];
    }

    // [6.8.6]
    // Retrieves installed engineering systems.
    const installedSystems =
        energyState[zoneKey]
            .installedSystems;

    // [6.8.7]
    // Prevents duplicate installations.
    const alreadyInstalled =
        installedSystems.some(
            system =>
                system.id ===
                selectedSystem.id
        );

    // [6.8.8]
    // Stops duplicate engineering installs.
    if (alreadyInstalled) {

        console.warn(
            "System already installed."
        );

        return;
    }

    // [6.8.9]
    // Adds engineering system safely.
    installedSystems.push(
        selectedSystem
    );

    // [6.8.10]
    // Outputs installation diagnostics.
    console.log(
        "Installed System:",
        zoneKey,
        selectedSystem
    );
}

// =====================================================
// REMOVAL ENGINE
// =====================================================

// [6.8.11]
// Removes installed engineering system safely.
export function removeSystem(
    zoneKey,
    systemId
) {

    // [6.8.12]
    // Validates removal request safely.
    if (
        !zoneKey ||
        !systemId
    ) {

        console.warn(
            "Invalid removal request."
        );

        return;
    }

    // [6.8.13]
    // Prevents invalid runtime access.
    if (
        !energyState[zoneKey]
    ) {

        return;
    }

    // [6.8.14]
    // Prevents undefined installed systems array.
    if (
        !energyState[zoneKey]
            .installedSystems
    ) {

        return;
    }

    // [6.8.15]
    // Removes selected engineering system.
    energyState[zoneKey]
        .installedSystems =

        energyState[zoneKey]
            .installedSystems
            .filter(
                system =>
                    system.id !==
                    systemId
            );

    // [6.8.16]
    // Outputs scalable removal diagnostics.
    console.log(
        "Removed System:",
        zoneKey,
        systemId
    );
}