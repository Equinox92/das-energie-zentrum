// [5.9.10]
// Imports centralized environment runtime state.
import {
    environmentState
} from "../core/environmentState.js";

// [18.12.6.1]
// Imports centralized solar-resource calculation service.
import {
    calculateSolarResource
} from "../services/solarResourceService.js";

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

    // =====================================================
// [18.12.5.1]
// RETRIEVES SOLAR GEOGRAPHIC POSITION SLIDER.
// =====================================================

const solarGeographicSlider =
    document.getElementById(
        "solar-geographic-position-slider"
    );

    // =====================================================
// [18.12.7.2]
// RETRIEVES SOLAR RESOURCE OUTPUT ELEMENT.
// =====================================================

const solarResourceOutput =
    document.getElementById(
        "solar-resource-output"
    );

    // =====================================================
// [18.12.5A.1]
// VERIFIES SOLAR GEOGRAPHIC SLIDER DOM CONNECTION.
// =====================================================

console.log(
    "[18.12.5A] Solar Geographic Slider:",
    solarGeographicSlider
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

// =====================================================
// [18.12.8.1]
// RECALCULATES SOLAR RESOURCE WHEN SEASON CHANGES.
// =====================================================

const solarResource =
    calculateSolarResource(
        environmentState.solarGeographicPosition,
        environmentState.season,
        environmentState.solarIntensity
    );

// [18.12.8.2]
// Updates the visible solar-resource output.
solarResourceOutput.textContent =
    `${solarResource.estimatedKwhM2.toFixed(1)} kWh/m²`;

// [18.12.8.3]
// Outputs seasonal solar-resource diagnostics.
console.log(
    "[18.12.8] Seasonal Solar Resource:",
    solarResource
);

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

                // =====================================================
// [18.12.9.4]
// RECALCULATES SOLAR RESOURCE WHEN INTENSITY CHANGES.
// =====================================================

const solarResource =
    calculateSolarResource(
        environmentState.solarGeographicPosition,
        environmentState.season,
        environmentState.solarIntensity
    );

// [18.12.9.5]
// Updates the visible solar-resource output.
solarResourceOutput.textContent =
    `${solarResource.estimatedKwhM2.toFixed(1)} kWh/m²`;

// [18.12.9.6]
// Outputs solar-intensity resource diagnostics.
console.log(
    "[18.12.9] Intensity-Adjusted Solar Resource:",
    solarResource
);

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

    // =====================================================
// [18.12.5.2]
// HANDLES SOLAR GEOGRAPHIC POSITION CHANGES.
// =====================================================
//
// Updates the centralized environmental state when
// the user moves the north-to-south Germany slider.
//
// The geographic position represents location only.
// Solar resource is calculated separately by the
// solar-resource service.
// =====================================================

// =====================================================
// [18.12.6.2]
// CALCULATES SOLAR RESOURCE FROM ENVIRONMENT STATE.
// =====================================================
//
// The controller updates environment state first.
// The solar-resource service then converts the
// geographic position and season into an estimated
// seasonal solar-resource value.
//
// Calculation remains inside the service.
// =====================================================

solarGeographicSlider.addEventListener(
    "input",
    event => {

        // [18.12.6.3]
        // Updates centralized geographic solar position.
        environmentState.solarGeographicPosition =
            Number(event.target.value);

        // [18.12.6.4]
        // Calculates seasonal solar resource from
        // centralized environmental inputs.
const solarResource =
    calculateSolarResource(
        environmentState.solarGeographicPosition,
        environmentState.season,
        environmentState.solarIntensity
    );

            // =====================================================
// [18.12.7.3]
// EXPOSES CALCULATED SOLAR RESOURCE TO THE UI.
// =====================================================

solarResourceOutput.textContent =
    `${solarResource.estimatedKwhM2.toFixed(1)} kWh/m²`;

        // [18.12.6.5]
        // Exposes the calculated solar-resource result
        // for development verification.
        console.log(
            "[18.12.6] Solar Resource:",
            solarResource
        );

        // [18.12.6.6]
        // Outputs geographic simulation diagnostics.
        console.log(
            "Solar Geographic Position:",
            environmentState.solarGeographicPosition
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