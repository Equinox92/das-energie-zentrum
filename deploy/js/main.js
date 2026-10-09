// [3.3.1]
// Imports backend health-check service layer.
import { checkApiHealth } from "./services/healthService.js";

// [3.3.2]
// Imports interactive SVG house loader system.
import { loadInteractiveHouse } from "./ui/houseLoader.js";


// next import { initializeHouseInteractions } from "./ui/houseInteractionEngine.js";
import { initializeHouseInteractions } from "./ui/houseInteractionEngine.js";

import {
    initializeNavbar
}
from "./ui/navbarController.js";



// [5.9.25]
// Imports environmental simulation controller.
import {
    initializeEnvironmentControls
} from "./ui/environmentController.js";

// [6.4.15]
// Imports persistence restoration layer.
import {
    loadEngineeringState
} from "./services/persistenceService.js";

import {
    renderInstalledSystems
} from "./ui/visualSystemRenderer.js";

// [6.5.1]
// Imports centralized runtime engineering state.
import {
    energyState
} from "./core/energyState.js";

import {
    updateEnergyDashboard
} from "./ui/dashboardSynchronizer.js";

// [16.4.27]
// Imports Energy Calculator controller.
import {
    initializeEnergyCalculator
} from "./modules/energyCalculatorController.js";

import {
    initializeHotspots
}
from "./ui/hotspotEngine.js";

import {
    initializeSectionReveal
} from "./ui/sectionReveal.js";

// [16.11.1]
// Imports centralized building context layer.
import {
    getBuildingContext
} from "./core/buildingContext.js";





// [3.3.3]
// Waits until full HTML document is loaded before running application logic.
document.addEventListener("DOMContentLoaded", async () => {



    // [3.3.11]
    // Initializes hotspots.
    initializeHotspots();


// [5.9.26]
// Initializes environmental simulation controls.
initializeEnvironmentControls();



// =====================================================
// [6.5.2]
// ENGINEERING STATE RESTORATION
// =====================================================

// [6.5.3]
// Attempts to restore persisted engineering state.
const persistedState =
    loadEngineeringState();

// [6.5.4]
// Validates restored persistence safely.
if (persistedState) {

    // [6.5.5]
    // Restores persisted runtime state safely.
    Object.assign(
        energyState,
        persistedState
    );

    // [6.5.6]
    // Synchronizes restored dashboard state.
    updateEnergyDashboard();

    // [6.5.7]
    // Synchronizes restored visualization state.
    renderInstalledSystems();

    // [6.5.8]
    // Outputs restoration diagnostics.
    console.log(
        "Engineering state restored."
    );
}

// [6.4.18]

updateEnergyDashboard();

// =====================================================
// [16.4.28]
// ENERGY CALCULATOR INITIALIZATION
// =====================================================

// [16.4.29]
// Initializes the Energy Calculator controller.
// =====================================================
// [17.6.5]
// CONTEXT-FIRST CALCULATOR INITIALIZATION
// =====================================================
//
// The calculator establishes the active building context.
// The house presentation is intentionally deferred until
// a successful assessment has been completed.
// =====================================================

let housePresentationInitialized = false;

initializeEnergyCalculator(
    async (
        assessment,
        buildingContext
    ) => {

        // =================================================
        // [17.6.6]
        // PREVENT DUPLICATE HOUSE INITIALIZATION
        // =================================================

        if (housePresentationInitialized) {

            console.log(
                "[17.6] Building presentation already initialized."
            );

            return;
        }

        // =================================================
        // [17.6.7]
        // CONFIRM CONTEXT-READY STATE
        // =================================================

        console.log(
            "[17.6] Building context ready:",
            buildingContext
        );

        console.log(
            "[17.6] AS-IS assessment ready:",
            assessment
        );

        // =================================================
        // [17.6.8]
        // LOAD CONTEXTUAL BUILDING PRESENTATION
        // =================================================

        await loadInteractiveHouse();

        // =================================================
        // [17.6.9]
        // INITIALIZE HOUSE INTERACTION ENGINE
        // =================================================

        initializeHouseInteractions();

        // =================================================
        // [17.6.10]
        // LOCK HOUSE PRESENTATION LIFECYCLE
        // =================================================

        housePresentationInitialized = true;

        console.log(
            "[17.6] Building presentation initialized."
        );

    }
);

// =====================================================
// [16.11.2]
// BUILDING CONTEXT DIAGNOSTIC
// =====================================================

// Retrieves the current building context.
const buildingContext =
    getBuildingContext();

// Outputs the current building identity
// for controlled development verification.
console.log(
    "[17.6] Initial building context:",
    buildingContext
);

//12.6.5 Section reveal engine

initializeSectionReveal();


initializeNavbar();




    // [3.3.5]
    // Retrieves API status display element.
    const apiStatusElement =
        document.getElementById("api-status");

    try {

        // [3.3.6]
        // Requests backend API health data.
        const response =
            await checkApiHealth();

        // [3.3.7]
        // Displays successful backend connection status.
        apiStatusElement.textContent =
            `Backend Connected: ${response.data.status}`;

    } catch (error) {

        // [3.3.8]
        // Displays graceful frontend failure message.
        apiStatusElement.textContent =
            "Backend connection failed.";

        // [3.3.9]
        // Outputs detailed debugging information safely.
        console.error(error);
    }
});