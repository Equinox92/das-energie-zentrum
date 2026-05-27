// [9.2.1]
// Imports centralized environmental runtime state.
import {
    environmentState
} from "../core/environmentState.js";

// [9.2.2]
// Imports centralized engineering runtime state.
import {
    energyState
} from "../core/energyState.js";

// =====================================================
// THERMAL VISUALIZATION ENGINE
// =====================================================

// [9.2.3]
// Synchronizes dynamic environmental visualization states.
export function updateThermalVisualization() {

    // [9.2.4]
    // Retrieves engineering overlay systems.
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

    // [9.2.5]
    // Retrieves active environmental state.
    const {
        season,
        solarIntensity
    } = environmentState;

    // =====================================================
    // SOLAR INTENSITY VISUALIZATION
    // =====================================================

    // [10.2.1]
    // Synchronizes animated solar engineering systems.
    if (
        solarOverlay &&
        energyState.roof
            .installedSystems.length > 0
    ) {

        solarOverlay.classList.add(
            "solar-active"
        );

        solarOverlay.style.filter =
            `brightness(${1 + (solarIntensity / 100)})`;
    }
    else if (solarOverlay) {

        solarOverlay.classList.remove(
            "solar-active"
        );
    }

    // =====================================================
    // WINTER THERMAL RESPONSE
    // =====================================================

    // [9.2.7]
    // Applies winter engineering visualization.
    if (season === "winter") {

        if (wallOverlay) {

            wallOverlay.classList.add(
                "wall-active"
            );

            wallOverlay.style.filter =
                "drop-shadow(0 0 12px rgba(0,180,255,0.8))";
        }

        if (windowOverlay) {

            windowOverlay.classList.add(
                "window-active"
            );

            windowOverlay.style.filter =
                "drop-shadow(0 0 10px rgba(120,180,255,0.7))";
        }
    }

    // =====================================================
    // SUMMER THERMAL RESPONSE
    // =====================================================

    // [9.2.8]
    // Applies summer engineering visualization.
    if (season === "summer") {

        if (wallOverlay) {

            wallOverlay.style.filter =
                "drop-shadow(0 0 12px rgba(255,180,0,0.5))";
        }

        if (windowOverlay) {

            windowOverlay.style.filter =
                "drop-shadow(0 0 10px rgba(255,220,120,0.45))";
        }
    }

    // [9.2.9]
    // Outputs thermal synchronization diagnostics.
    console.log(
        "Thermal visualization synchronized."
    );
}