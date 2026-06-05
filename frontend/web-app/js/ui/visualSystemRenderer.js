// [7.1.1]
// Imports centralized runtime engineering state.
import {
    energyState
} from "../core/energyState.js";

// =====================================================
// ENGINEERING VISUALIZATION RENDERER
// =====================================================


// =====================================================
// VISUALIZATION CLEANUP ENGINE
// =====================================================

// [10.2.2]
// Removes previously rendered engineering overlays safely.

// [7.1.2]
// Synchronizes installed engineering systems visually.
// [7.1.2]
// Synchronizes installed engineering systems visually.
export function renderInstalledSystems() {

    const roofZone =
        document.querySelector(
            '[data-zone="roof"]'
        );

    const wallZone =
        document.querySelector(
            '[data-zone="walls"]'
        );

    const windowZone =
        document.querySelector(
            '[data-zone="windows"]'
        );

    const roofSystems =
        energyState.roof
            ?.installedSystems || [];

    const wallSystems =
        energyState.walls
            ?.installedSystems || [];

    const windowSystems =
        energyState.windows
            ?.installedSystems || [];

    // =====================================================
    // RESET VISUAL STATES
    // =====================================================

    [
        roofZone,
        wallZone,
        windowZone
    ].forEach(zone => {

        if (!zone) return;

        zone.style.filter = "";
        zone.style.strokeWidth = "2";
    });

    // =====================================================
    // ROOF HEALTH
    // =====================================================

    if (roofZone) {

        if (roofSystems.length === 0) {

            roofZone.style.filter =
                "drop-shadow(0 0 12px red)";
        }

        else if (
            roofSystems.length === 1
        ) {

            roofZone.style.filter =
                "drop-shadow(0 0 12px orange)";
        }

        else {

            roofZone.style.filter =
                "drop-shadow(0 0 12px lime)";
        }

        roofZone.style.strokeWidth =
            "4";
    }

    // =====================================================
    // WALL HEALTH
    // =====================================================

    if (wallZone) {

        if (wallSystems.length === 0) {

            wallZone.style.filter =
                "drop-shadow(0 0 12px red)";
        }

        else if (
            wallSystems.length === 1
        ) {

            wallZone.style.filter =
                "drop-shadow(0 0 12px orange)";
        }

        else {

            wallZone.style.filter =
                "drop-shadow(0 0 12px lime)";
        }

        wallZone.style.strokeWidth =
            "4";
    }

    // =====================================================
    // WINDOW HEALTH
    // =====================================================

    if (windowZone) {

        if (windowSystems.length === 0) {

            windowZone.style.filter =
                "drop-shadow(0 0 12px red)";
        }

        else if (
            windowSystems.length === 1
        ) {

            windowZone.style.filter =
                "drop-shadow(0 0 12px orange)";
        }

        else {

            windowZone.style.filter =
                "drop-shadow(0 0 12px lime)";
        }

        windowZone.style.strokeWidth =
            "4";
    }

    console.log(
        "Engineering visualization synchronized."
    );
}

