// [5.9.10]
// Imports centralized environment runtime state.
import {
    environmentState
} from "../core/environmentState.js";

// [5.9.11]
// Imports dashboard synchronization.
import {
    updateEnergyDashboard
} from "./dashboardSynchronizer.js";

// [5.9.12]
// Imports visualization synchronization.
import {
    renderInstalledSystems
} from "./visualSystemRenderer.js";

// [9.1.1]
// Imports thermal visualization synchronization.
import {
    updateThermalVisualization
} from "./thermalVisualizationEngine.js";

// [5.9.13]
// Initializes environmental simulation controls.
export function initializeEnvironmentControls() {

    // [5.9.14]
    // Retrieves season simulation selector.
    const seasonSelector =
        document.getElementById(
            "season-selector"
        );

    // [5.9.15]
    // Retrieves solar intensity slider.
    const solarSlider =
        document.getElementById(
            "solar-intensity-slider"
        );

    // --------------------------------------------------
    // SEASON SIMULATION
    // --------------------------------------------------

    // [5.9.16]
    // Handles season simulation changes.
    seasonSelector.addEventListener(
        "change",
        event => {

            // [5.9.17]
            // Updates centralized season state.
            environmentState.season =
                event.target.value;

            // [5.9.18]
            // Synchronizes dashboard calculations.
            updateEnergyDashboard();

            // [9.1.2]
// Synchronizes thermal visualization states.
updateThermalVisualization();

            // [5.9.19]
            // Synchronizes visualization engine.
            renderInstalledSystems();

            // [5.10.13]
// Synchronizes climate visualization engine.
synchronizeClimateVisuals();

            // [5.9.20]
            // Outputs simulation diagnostics.
            console.log(
                "Environment State:",
                environmentState
            );
        }
    );

    // --------------------------------------------------
    // SOLAR SIMULATION
    // --------------------------------------------------

    // [5.9.21]
    // Handles solar intensity simulation.
    solarSlider.addEventListener(
        "input",
        event => {

            // [5.9.22]
            // Updates centralized solar state.
            environmentState.solarIntensity =
                Number(event.target.value);

        // [9.1.3]
        // Synchronizes dashboard intelligence.
        updateEnergyDashboard();

        // [5.9.23]
        // Synchronizes visualization engine.
        renderInstalledSystems();

        // [9.1.4]
        // Synchronizes thermal visualization engine.
        updateThermalVisualization();

            // [5.10.13]
// Synchronizes climate visualization engine.
synchronizeClimateVisuals();

            // [5.9.24]
            // Outputs simulation diagnostics.
            console.log(
                "Solar Intensity:",
                environmentState.solarIntensity
            );
        }
    );
    // [5.10.14]
// Synchronizes initial climate state.
synchronizeClimateVisuals();
}

// [5.10.7]
// Synchronizes global climate visualization state.
function synchronizeClimateVisuals() {

    // [5.10.8]
    // Retrieves application body safely.
    const body =
        document.body;

    // [5.10.9]
    // Clears previous climate states.
    body.classList.remove(
        "climate-winter",
        "climate-summer",
        "solar-intensity-active"
    );

    // --------------------------------------------------
    // SEASON VISUALIZATION
    // --------------------------------------------------

    // [5.10.10]
    // Activates winter atmosphere.
    if (
        environmentState.season ===
        "winter"
    ) {

        body.classList.add(
            "climate-winter"
        );
    }

    // [5.10.11]
    // Activates summer atmosphere.
    if (
        environmentState.season ===
        "summer"
    ) {

        body.classList.add(
            "climate-summer"
        );
    }

    // --------------------------------------------------
    // SOLAR VISUALIZATION
    // --------------------------------------------------

    // [5.10.12]
    // Activates solar intensity atmosphere.
    if (
        environmentState.solarIntensity >
        60
    ) {

        body.classList.add(
            "solar-intensity-active"
        );
    }
}