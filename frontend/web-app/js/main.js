// [3.3.1]
// Imports backend health-check service layer.
import { checkApiHealth } from "./services/healthService.js";

// [3.3.2]
// Imports interactive SVG house loader system.
import { loadInteractiveHouse } from "./ui/houseLoader.js";


// next import { initializeHouseInteractions } from "./ui/houseInteractionEngine.js";
import { initializeHouseInteractions } from "./ui/houseInteractionEngine.js";



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



// [3.3.3]
// Waits until full HTML document is loaded before running application logic.
document.addEventListener("DOMContentLoaded", async () => {

    // [3.3.4]
    // Loads scalable interactive SVG house component.
    await loadInteractiveHouse();

    // [3.3.10]
// Activates scalable SVG interaction engine.
initializeHouseInteractions();


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