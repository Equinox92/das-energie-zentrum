// [3.12.1]
// Imports centralized energy state.
import { energyState } from "../core/energyState.js";

// [3.12.2]
// Synchronizes SVG visualization with installed systems.
export function renderInstalledSystems() {

    // [3.12.3]
    // Outputs renderer execution diagnostics.
    console.log("Renderer Running");

    // [3.12.4]
    // Retrieves solar visualization layer safely.
    const solarPanels =
        document.getElementById(
            "solar-panel-system"
        );

    // [3.12.5]
    // Retrieves wall insulation overlay safely.
    const wallOverlay =
        document.getElementById(
            "wall-insulation-overlay"
        );

    // [3.12.6]
    // Retrieves efficient window overlay safely.
    const windowOverlay =
        document.getElementById(
            "efficient-window-overlay"
        );

    // [3.12.7]
    // Prevents renderer execution before SVG exists.
    if (
        !solarPanels ||
        !wallOverlay ||
        !windowOverlay
    ) {

        console.warn(
            "SVG visualization layers not ready yet."
        );

        return;
    }

    // [3.12.8]
    // Activates solar visualization.
    if (energyState.systems.roofInsulation) {

        solarPanels.setAttribute(
            "visibility",
            "visible"
        );
    }

    // [3.12.9]
    // Activates wall insulation overlay.
    if (energyState.systems.wallInsulation) {

        wallOverlay.style.opacity = "0.35";
    }

    // [3.12.10]
    // Activates efficient window visualization.
    if (energyState.systems.efficientWindows) {

        windowOverlay.style.opacity = "0.5";
    }
}