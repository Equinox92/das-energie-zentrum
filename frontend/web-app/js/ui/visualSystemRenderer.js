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
export function renderInstalledSystems() {

    // [10.2.1]
// Clears previous visualization overlays safely.


    // [7.1.3]
    // Retrieves SVG engineering zones safely.
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

// [8.2.1]
// Retrieves engineering overlay layers.
const solarOverlay =
    document.getElementById(
        "solar-overlay"
    );

const wallOverlay =
    document.getElementById(
        "wall-overlay"
    );

const windowOverlay =
    document.getElementById(
        "window-overlay"
    );


    // =====================================================
    // RESET VISUAL STATES
    // =====================================================

    // [7.1.4]
    // Clears previous engineering visual states.
    [
        roofZone,
        wallZone,
        windowZone
    ].forEach(zone => {

        if (!zone) return;

        zone.style.filter = "";
        zone.style.strokeWidth = "2";
    });

    // [8.2.5]
// Resets engineering overlays safely.
[
    solarOverlay,
    wallOverlay,
    windowOverlay
].forEach(overlay => {

    if (!overlay) return;

    overlay.setAttribute(
        "opacity",
        "0"
    );
});

    // =====================================================
    // ROOF VISUALIZATION
    // =====================================================

    // [7.1.5]
    // Retrieves installed roof systems.
    const roofSystems =
        energyState.roof
            ?.installedSystems || [];

    // [7.1.6]
    // Detects installed solar systems.
    const hasSolar =
        roofSystems.some(
            system =>
                system.category ===
                "solar"
        );

    // [7.1.7]
    // Applies solar engineering visualization.
    if (
        hasSolar &&
        roofZone
    ) {

        roofZone.style.filter =
            "drop-shadow(0 0 12px gold)";

        roofZone.style.strokeWidth =
            "4";

            // [8.2.2]
// Activates solar engineering overlays.
if (solarOverlay) {

    solarOverlay.setAttribute(
        "opacity",
        "1"
    );
}
    }

    // =====================================================
    // WALL VISUALIZATION
    // =====================================================

    // [7.1.8]
    // Retrieves installed wall systems.
    const wallSystems =
        energyState.walls
            ?.installedSystems || [];

    // [7.1.9]
    // Detects thermal wall systems.
    const hasThermalWalls =
        wallSystems.some(
            system =>
                system.category ===
                "insulation"
        );

    // [7.1.10]
    // Applies thermal wall visualization.
    if (
        hasThermalWalls &&
        wallZone
    ) {

        wallZone.style.filter =
            "drop-shadow(0 0 12px cyan)";

        wallZone.style.strokeWidth =
            "4";

           // [8.2.3]
// Activates thermal wall overlays.
if (wallOverlay) {

    wallOverlay.setAttribute(
        "opacity",
        "1"
    );
} 
    }

    // =====================================================
    // WINDOW VISUALIZATION
    // =====================================================

    // [7.1.11]
    // Retrieves installed window systems.
    const windowSystems =
        energyState.windows
            ?.installedSystems || [];

    // [7.1.12]
    // Detects high-efficiency glazing systems.
    const hasEfficientWindows =
        windowSystems.some(
            system =>
                system.category ===
                "windows"
        );

    // [7.1.13]
    // Applies glazing visualization.
    if (
        hasEfficientWindows &&
        windowZone
    ) {

        windowZone.style.filter =
            "drop-shadow(0 0 12px white)";

        windowZone.style.strokeWidth =
            "4";

            // [8.2.4]
// Activates glazing overlays.
if (windowOverlay) {

    windowOverlay.setAttribute(
        "opacity",
        "1"
    );
}
    }

    // [7.1.14]
    // Outputs rendering diagnostics.
    console.log(
        "Engineering visualization synchronized."
    );
}